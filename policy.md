# SafePay Policy Specification

## 1. Purpose

The SafePay policy defines when an instant P2P transaction should:

- settle immediately,
- display a warning,
- require receiver confirmation,
- enter a temporary hold,
- be rejected,
- or be reported for investigation.

The policy is configurable and is intended for a proof-of-concept. The thresholds used in the prototype are not proposed legal or banking standards.

---

## 2. Scope

SafePay v1 focuses on:

- Person-to-person (P2P) payments
- High-value transactions
- High-risk transactions
- First-time sender-receiver relationships
- Suspicious transaction behaviour
- Receiver awareness and confirmation
- Transaction holds and release
- Linked reversals and transaction lineage

Merchant/P2M transactions will use a separate policy configuration.

---

## 3. Risk Factors

The prototype evaluates the following factors.

### Transaction Amount

Higher-value transactions receive a higher risk contribution.

### Relationship History

A first-time transaction between two users may receive additional risk.

Repeated successful transactions between the same users may reduce the risk contribution.

### Device Behaviour

A new or unusual device may increase risk.

### Location Behaviour

An unusual location compared with previous transaction behaviour may increase risk.

### Transaction Frequency

An unusual burst or sudden increase in transaction frequency may increase risk.

### Behavioural Anomaly

Transactions that significantly differ from the user's normal behaviour may receive additional risk.

---

## 4. Risk Levels

SafePay uses four prototype risk levels.

| Risk Level | Example Score | Default Action |
|------------|---------------|----------------|
| LOW | 0–29 | Instant settlement |
| MEDIUM | 30–59 | Warning |
| HIGH | 60–79 | Receiver confirmation |
| CRITICAL | 80–100 | Temporary hold + confirmation |

These score ranges are configurable prototype values.

They are not intended to represent an official banking risk standard.

---

## 5. Amount Threshold

SafePay supports a configurable high-value threshold.

Example:
```text
Default prototype threshold: ₹20,000

The threshold may be changed by an authorised policy administrator.
Possible demonstration values:
- ₹5,000
- ₹10,000
- ₹20,000
- ₹50,000
The system must not assume that ₹20,000 is universally appropriate.
---
6. Combined Risk Policy
The amount threshold should not be the only decision factor.
Example:
Scenario A
Amount: ₹500
Known contact
Normal device
Normal behaviour

Risk: LOW

Action: INSTANT SETTLEMENT

Scenario B
Amount: ₹25,000
Known contact
Normal device
Normal behaviour

Risk: MEDIUM

Action: WARNING

Scenario C
Amount: ₹25,000
First-time relationship
New device
Unusual behaviour

Risk: HIGH

Action: RECEIVER CONFIRMATION

Scenario D
Amount: ₹50,000
First-time relationship
New device
Unusual location
Unusual transaction frequency

Risk: CRITICAL

Action: TEMPORARY HOLD + RECEIVER CONFIRMATION
---

7. Receiver Confirmation
When confirmation is required, the receiver sees:
Incoming Payment

Amount: ₹25,000
Sender: User A

Why is confirmation required?

• High transaction amount
• First-time relationship
• Unusual device

What would you like to do?

[ ACCEPT ]

[ REJECT ]

[ REPORT SUSPICIOUS ]

The receiver should be given enough context to make an informed decision.
The system should not reveal unnecessary sensitive information.
---

8. Receiver Actions
Accept
The payment proceeds toward settlement.
HELD
  ↓
ACCEPTED
  ↓
SETTLED

Reject
The payment does not proceed to normal settlement.
HELD
  ↓
REJECTED
  ↓
REVERSAL / RETURN FLOW

The reversal must remain linked to the original transaction.
Report
The payment is flagged for investigation.
HELD
  ↓
REPORTED
  ↓
INVESTIGATION

Receiver confirmation alone does not prove that a transaction is legitimate.
---

9. Temporary Hold
A temporary hold is a prototype safety state.
During the hold:
- the transaction is not considered finally settled,
- the receiver can respond,
- the system records the pending state,
- the policy engine controls the next state.
The hold duration is configurable in the prototype.
Example:
Confirmation window: 5 minutes

This is a demonstration parameter, not a proposed universal banking rule.
---

10. Expiration
If the receiver does not respond before the confirmation window expires:
HELD
  ↓
EXPIRED

The prototype policy can be configured to either:
- cancel/reverse the transaction,
- keep it pending for investigation,
- or apply another configured policy.
The default SafePay v1 behaviour will be:
High-risk transactions that receive no receiver response will not automatically become final solely because the confirmation window expired.
---

11. Transaction Lineage Policy
Every SafePay transaction receives a unique internal transaction ID.
Example:
T001
A → B
₹20,000

If a return occurs:
T002
B → A
₹20,000

linked_to: T001

The relationship must be stored explicitly.
This allows investigators to distinguish:
- original payment,
- reversal,
- refund,
- subsequent transfer,
- unrelated transaction.
---

12. P2P vs Merchant Policy
SafePay must maintain separate policies for:
P2P
Examples:
Person → Person
Friend → Friend
Parent → Child

P2M
Examples:
Person → Restaurant
Person → Store
Person → Online Merchant
---

A high-value P2P transfer should not automatically receive the same treatment as a high-value merchant payment.
13. Policy Priority
When multiple rules apply, SafePay follows this priority:
CRITICAL RISK
     ↓
TEMPORARY HOLD

HIGH RISK
     ↓
RECEIVER CONFIRMATION

MEDIUM RISK
     ↓
WARNING

LOW RISK
     ↓
INSTANT SETTLEMENT

A higher-risk rule takes precedence over a lower-risk rule.
---

14. Policy Explainability
Every policy decision must record:
- Risk score
- Risk level
- Triggered rules
- Final action
- Timestamp
- Policy version
Example:
Transaction: T001

Risk Score: 82
Risk Level: CRITICAL

Triggered Rules:
✓ Amount above threshold
✓ First-time relationship
✓ New device
✓ Behavioural anomaly

Policy Decision:
TEMPORARY HOLD

Policy Version:
v1.0
---

15. Policy Safety Principles
SafePay should follow these principles:
1. Do not add unnecessary friction to low-risk payments.
2. Do not rely on transaction amount alone.
3. Explain why additional confirmation is required.
4. Keep P2P and merchant policies separate.
5. Keep a complete audit trail.
6. Link reversals to their original transactions.
7. Never treat receiver confirmation as proof that a payment is legitimate.
8. Keep all prototype thresholds configurable.
9. Never expose real banking credentials or real-money transactions.
10. Treat the risk score as a decision-support signal rather than proof of fraud.
16. Policy Objective
The objective of SafePay is to explore the following trade-off:
Increase safety for high-risk instant P2P payments while keeping normal low-risk payments fast and convenient.

The prototype will therefore evaluate both:
- security benefit,
- and additional user friction.
17. Policy Version
Current version:
SafePay Policy v1.0

All future policy changes should be documented in the project's decision log.

### Then commit

Use:

**Commit message:**

```text
docs: define SafePay policy


```text
Default prototype threshold: ₹20,000
