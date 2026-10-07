const { v4: uuidv4 } = require("uuid");
const { calculateRisk } = require("../services/riskEngine");
const { determinePolicy } = require("../services/policyEngine");
const pool= require("../db");

async function createTransaction(req, res) {
    try {
        const {
            senderAccountId,
            receiverAccountId,
            amount,
            isFirstTransaction,
            newDevice,
            unusualLocation,
            highFrequency,
            unusualBehaviour
        } = req.body;

        if (!senderAccountId || !receiverAccountId || !amount) {
            return res.status(400).json({
                error: "senderAccountId, receiverAccountId and amount are required"
            });
        }

        const risk = calculateRisk({
            amount,
            isFirstTransaction,
            newDevice,
            unusualLocation,
            highFrequency,
            unusualBehaviour
        });

        const policy = determinePolicy(
            risk.riskScore,
            risk.riskLevel
        );

        const transactionId = uuidv4();

        // Save transaction
        await pool.query(
            `INSERT INTO transactions
            (
                id,
                sender_account_id,
                receiver_account_id,
                amount,
                risk_score,
                risk_level,
                policy_action,
                status,
                provider
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
            [
                transactionId,
                senderAccountId,
                receiverAccountId,
                amount,
                risk.riskScore,
                risk.riskLevel,
                policy.action,
                policy.requiresHold ? "HELD" : "RISK_ASSESSED",
                "MOCK"
            ]
        );

        // Save risk assessment
        await pool.query(
            `INSERT INTO risk_assessments
            (
                id,
                transaction_id,
                risk_score,
                risk_level,
                amount_risk,
                relationship_risk,
                device_risk,
                location_risk,
                frequency_risk,
                behaviour_risk,
                triggered_rules,
                policy_action
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
            [
                uuidv4(),
                transactionId,
                risk.riskScore,
                risk.riskLevel,
                risk.factors.amountRisk,
                risk.factors.relationshipRisk,
                risk.factors.deviceRisk,
                risk.factors.locationRisk,
                risk.factors.frequencyRisk,
                risk.factors.behaviourRisk,
                JSON.stringify(risk.factors),
                policy.action
            ]
        );

        // Save audit event
        await pool.query(
            `INSERT INTO audit_logs
            (
                id,
                transaction_id,
                event_type,
                actor_type,
                details
            )
            VALUES ($1,$2,$3,$4,$5)`,
            [
                uuidv4(),
                transactionId,
                "TRANSACTION_CREATED",
                "SYSTEM",
                JSON.stringify({
                    riskScore: risk.riskScore,
                    riskLevel: risk.riskLevel,
                    policyAction: policy.action
                })
            ]
        );

        res.status(201).json({
            success: true,
            transaction: {
                id: transactionId,
                senderAccountId,
                receiverAccountId,
                amount,
                status:
                policy.requiresHold || policy.requiresConfirmation
                    ? "PENDING_CONFIRMATION"
                    : "RISK_ASSESSED",
                riskScore: risk.riskScore,
                riskLevel: risk.riskLevel,
                policyAction: policy.action
            },
            risk,
            policy
        });

    } catch (error) {
        console.error("Transaction error:", error);

        res.status(500).json({
            error: "Transaction processing failed"
        });
    }
}
async function confirmTransaction(req, res) {
    try {
        const { id } = req.params;
        const { decision, reason } = req.body;

        const validDecisions = ["ACCEPT", "REJECT", "REPORT"];

        if (!validDecisions.includes(decision)) {
            return res.status(400).json({
                error: "Decision must be ACCEPT, REJECT or REPORT"
            });
        }

        const transactionResult = await pool.query(
            `SELECT *
             FROM transactions
             WHERE id = $1`,
            [id]
        );

        if (transactionResult.rows.length === 0) {
            return res.status(404).json({
                error: "Transaction not found"
            });
        }

        const transaction = transactionResult.rows[0];

        // Only held/high-risk transactions require confirmation
        if (
            transaction.risk_level !== "HIGH" &&
            transaction.risk_level !== "CRITICAL"
        ) {
            return res.status(400).json({
                error: "Receiver confirmation is not required for this transaction"
            });
        }

        let newStatus;

        if (decision === "ACCEPT") {
            newStatus = "SETTLED";
        } else if (decision === "REJECT") {
            newStatus = "REVERSED";
        } else {
            newStatus = "INVESTIGATION";
        }

        await pool.query(
            `INSERT INTO confirmations
            (
                id,
                transaction_id,
                receiver_account_id,
                decision,
                reason
            )
            VALUES ($1, $2, $3, $4, $5)`,
            [
                uuidv4(),
                id,
                transaction.receiver_account_id,
                decision,
                reason || null
            ]
        );

        await pool.query(
            `UPDATE transactions
             SET status = $1,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $2`,
            [newStatus, id]
        );

        await pool.query(
            `INSERT INTO audit_logs
            (
                id,
                transaction_id,
                event_type,
                actor_type,
                details
            )
            VALUES ($1, $2, $3, $4, $5)`,
            [
                uuidv4(),
                id,
                `RECEIVER_${decision}`,
                "RECEIVER",
                JSON.stringify({
                    decision,
                    reason: reason || null,
                    resultingStatus: newStatus
                })
            ]
        );

        res.json({
            success: true,
            transactionId: id,
            decision,
            status: newStatus
        });

    } catch (error) {
        console.error("Confirmation error:", error);

        res.status(500).json({
            error: "Confirmation processing failed"
        });
    }
}

module.exports = {
    createTransaction,
    confirmTransaction
};
