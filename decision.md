
### Decision

SafePay's core logic must remain independent of payment providers.

### Reason

The policy should theoretically work with different payment infrastructures.

Therefore:

```text
SafePay Core
     |
Payment Adapter
     |
+----+---------+----------+
|              |          |
Mock        Razorpay   Airwallex
                          |
                        PayPal

The provider is treated as a payment/test rail rather than the owner of the SafePay policy.
Decision 003 — Mock Payment Rail First
Decision
Development will begin with a simulated payment rail.
Reason
This allows the team to validate:
- transaction states,
- risk scoring,
- policy decisions,
- receiver confirmation,
- holds,
- settlement,
- reversals,
- transaction lineage,
without depending on an external provider.
External sandbox integrations will be added only after the core system works.
Decision 004 — Provider Integration Order
Decision
Provider integrations will be developed in this order:
1. Razorpay
2. Airwallex
3. PayPal
Reason
Razorpay provides a useful starting point because of the project's Indian payment context and existing development experience.
Airwallex is then used to explore a global payment infrastructure environment.
PayPal provides another global sandbox environment.
Decision 005 — Rule-Based Risk Engine First
Decision
SafePay v1 will use an explainable rule-based risk engine.
Reason
The primary contribution being demonstrated is the policy mechanism, not a new machine-learning algorithm.
A rule-based engine allows every decision to be explained.
Example:
Risk Score: 82

Reasons:
- High transaction amount
- First-time relationship
- New device
- Behavioural anomaly

Machine learning may be introduced later as an enhancement.
Decision 006 — Risk Score Does Not Equal Fraud
Decision
The SafePay risk score will never be presented as proof that a transaction is fraudulent.
Reason
Risk indicators are signals.
A high-risk transaction may still be legitimate.
Therefore the system will use language such as:
- High Risk
- Requires Confirmation
- Suspicious Activity
- Review Required
rather than automatically declaring a user or transaction fraudulent.
Decision 007 — Receiver Confirmation is Selective
Decision
Receiver confirmation will not be required for every payment.
Reason
Universal confirmation would reduce the convenience of instant payments.
SafePay instead follows a risk-adaptive model:
Low Risk
    ↓
Instant

Medium Risk
    ↓
Warning

High Risk
    ↓
Confirmation

Critical Risk
    ↓
Hold + Confirmation

Decision 008 — ₹20,000 is Only a Prototype Parameter
Decision
₹20,000 may be used as the initial demonstration threshold.
Reason
The original SafePay idea came from considering high-value P2P payments.
However, ₹20,000 is not being presented as an official banking or regulatory threshold.
The value must remain configurable.
Decision 009 — P2P and P2M are Separate
Decision
SafePay v1 focuses primarily on P2P transactions.
Merchant/P2M payments will have a separate policy configuration.
Reason
Person-to-person and person-to-merchant transactions have different behavioural patterns and payment contexts.
A policy designed for P2P transactions should not automatically be applied to merchants.
Decision 010 — Temporary Hold
Decision
High-risk transactions may enter a temporary HOLD state before final settlement.
Reason
The hold creates the safety checkpoint required for receiver confirmation.
Example:
Payment Initiated
       ↓
Risk Assessment
       ↓
HIGH RISK
       ↓
HOLD
       ↓
Receiver Decision
       ↓
Settlement / Reversal / Investigation

The hold is a prototype mechanism and not a claim about how a real payment network must implement settlement.
Decision 011 — Receiver Actions
Decision
The receiver will have three primary actions:
ACCEPT
REJECT
REPORT

Reason
The receiver needs more than a passive notification.
These actions represent three distinct outcomes:
- Accept → continue toward settlement
- Reject → initiate the configured return/reversal flow
- Report → create an investigation case
Decision 012 — Transaction Lineage
Decision
Every SafePay transaction will have an internal transaction ID.
Related transactions will explicitly reference the original transaction.
Example:
T001
A → B ₹20,000

T002
B → A ₹20,000
linked_to = T001

Reason
This provides structured transaction context for investigation.
It also prevents a reversal from appearing as an unrelated payment.
Decision 013 — Audit Trail
Decision
Important SafePay events will be recorded in an append-only audit log.
Examples:
TRANSACTION_CREATED
RISK_ASSESSED
POLICY_APPLIED
PAYMENT_HELD
RECEIVER_ACCEPTED
RECEIVER_REJECTED
TRANSACTION_REPORTED
PAYMENT_SETTLED
REVERSAL_CREATED
WEBHOOK_RECEIVED

Reason
Payment-security systems require explainability and traceability.
Decision 014 — Synthetic Data and Money
Decision
SafePay will use simulated users, simulated balances and sandbox/test transactions.
Reason
The project is a proof-of-concept.
No real customer funds or real banking credentials should be used.
Decision 015 — Security Before External Integration
Decision
Provider credentials and sensitive configuration must never be committed to GitHub.
Rules
- Secrets stay in .env
- .env is included in .gitignore
- Provider secrets are backend-only
- Webhook signatures are verified where supported
- API inputs are validated
- State-changing operations use idempotency where appropriate
Decision 016 — No Premature Machine Learning
Decision
Machine learning will not be the first implementation.
Reason
Adding ML before the policy mechanism works would increase complexity without proving the central idea.
The development order is:
Policy
  ↓
Rules
  ↓
Prototype
  ↓
Evaluation
  ↓
ML enhancement (optional)

Decision 017 — Evaluation Must Include Friction
Decision
SafePay will evaluate both security-related outcomes and user friction.
Security-oriented measurements
- High-risk scenario interception
- False-positive rate
- Traceability completeness
- Investigation visibility
Usability-oriented measurements
- Confirmation time
- Completion rate
- User understanding
- Percentage of transactions remaining instant
Reason
A payment-security policy that makes every payment difficult to use would not be practical.
Decision 018 — External Positioning
Decision
SafePay will be presented as a proof-of-concept and proposal for industry evaluation.
It will not be presented as:
- an officially approved banking policy,
- a replacement for UPI,
- a production payment system,
- a guaranteed fraud-prevention mechanism.
The external message will be:
SafePay explores whether risk-adaptive receiver confirmation, selective payment holding, and transaction lineage can provide an additional safety layer for high-risk instant P2P payments while preserving speed for normal transactions.

Decision 019 — Project Scope Protection
Whenever a new feature is proposed, ask:
Does this strengthen the SafePay core concept?

The SafePay core is:
Risk Assessment
      +
Policy Decision
      +
Selective Receiver Confirmation
      +
Temporary Safety State
      +
Transaction Lineage

Features that do not strengthen this core should be postponed unless they are required for security, testing, or demonstration.
Decision 020 — Current Project Status
Current status:
Concept        ✅ LOCKED
Policy         ✅ LOCKED
Architecture   ✅ LOCKED
Decision Log   🔄 IN PROGRESS
Development    ⏳ NOT STARTED

Next development phase:
Phase 1 — Mock Payment Rail


### Commit with:

```text
docs: establish SafePay decision log
