function determinePolicy(riskScore, riskLevel) {

    if (riskLevel === "CRITICAL" || riskScore >= 80) {
        return {
            action: "HOLD_AND_CONFIRM",
            requiresHold: true,
            requiresConfirmation: true
        };
    }

    if (riskLevel === "HIGH" || riskScore >= 60) {
        return {
            action: "RECEIVER_CONFIRMATION",
            requiresHold: false,
            requiresConfirmation: true
        };
    }

    if (riskLevel === "MEDIUM" || riskScore >= 30) {
        return {
            action: "WARNING",
            requiresHold: false,
            requiresConfirmation: false
        };
    }

    return {
        action: "INSTANT_SETTLEMENT",
        requiresHold: false,
        requiresConfirmation: false
    };
}

module.exports = {
    determinePolicy
};