# SafePay

## Risk-Adaptive Safety Layer for Instant P2P Payments

### 1. Overview

SafePay is a provider-independent proof-of-concept designed to explore an additional safety layer for instant person-to-person (P2P) payments.

The core idea is simple:

> Keep low-risk payments instant, while giving high-risk or high-value payments an additional safety checkpoint before final settlement.

SafePay does not replace existing payment authentication, fraud detection, payee verification, or payment infrastructure. Instead, it acts as an additional policy layer that can work alongside them.

---

## 2. Problem

Instant payments are designed to be fast and convenient.

However, the same speed can create problems when:

- a user sends a large amount accidentally,
- a payment is redirected through social engineering,
- a first-time or unfamiliar relationship is involved,
- unusual transaction behaviour occurs,
- the receiver does not immediately recognize the payment.

In such situations, the payment may become difficult to stop once it is completed.

SafePay explores whether a selective safety checkpoint can reduce this risk without adding unnecessary friction to normal payments.

---

## 3. Proposed Solution

SafePay evaluates a P2P payment before settlement.

The system considers factors such as:

- transaction amount,
- relationship/history between sender and receiver,
- device changes,
- location anomalies,
- transaction frequency,
- unusual behavioural patterns,
- configurable risk policies.

Based on the resulting risk level, SafePay can:

- allow instant settlement,
- show a warning,
- temporarily hold the transaction,
- request receiver confirmation,
- allow the receiver to reject the transaction,
- allow the receiver to report the transaction as suspicious.

---

## 4. Core Payment Flow

```text
Sender
   |
   v
Payment Initiated
   |
   v
Risk Assessment
   |
   v
Policy Engine
   |
   +----------------------+
   |                      |
 Low Risk              High Risk
   |                      |
   v                      v
Instant Settlement      Temporary Hold
                          |
                          v
                  Receiver Confirmation
                    /       |       \
                   /        |        \
              Accept      Reject     Report
                 |           |          |
                 v           v          v
             Settlement   Reversal   Investigation

5. Transaction Lineage
SafePay also maintains a relationship between connected transactions.
Example:
T001: A -> B  ₹20,000

T002: B -> A  ₹20,000
      linked_to = T001

If the funds subsequently move:
A -> B -> C -> D

the system can represent the relationships as a transaction graph.
This is intended to improve investigation and traceability.
Transaction lineage does not by itself prove fraud or identify a criminal. It provides structured transaction context for investigation.
6. Risk-Adaptive Principle
SafePay should not introduce confirmation for every transaction.
Example:
₹500
Known contact
Normal behaviour
        |
        v
Instant settlement

Whereas:
₹25,000
First-time relationship
New device
Unusual behaviour
        |
        v
High risk
        |
        v
Temporary hold + receiver confirmation

The amount threshold and risk parameters are configurable prototype policies rather than fixed banking standards.
7. P2P and Merchant Payments
SafePay primarily focuses on P2P payments.
P2P and merchant/P2M payments should have separate policy configurations because their transaction contexts and expected behaviours are different.
SafePay does not assume that a policy designed for a person-to-person payment should automatically be applied to merchant payments.
8. What SafePay Is
SafePay is:
- a payment-security proof-of-concept,
- a risk-adaptive policy layer,
- a receiver-awareness mechanism for selected transactions,
- a transaction-lineage system,
- a provider-independent architecture,
- a platform for testing payment-security policies.
9. What SafePay Is Not
SafePay is not:
- a replacement for UPI or other payment rails,
- a real banking system,
- a production payment wallet,
- a guarantee against fraud,
- a replacement for authentication,
- a replacement for Verification of Payee,
- a claim that receiver confirmation is a completely new concept.
The project is intended to demonstrate and evaluate a possible combination of existing payment-security concepts in a new application context.
10. Provider Independence
The SafePay policy engine should not depend on a particular payment provider.
The architecture will use a common payment interface with provider-specific adapters.
Planned test integrations:
1. Mock Payment Rail
2. Razorpay Sandbox
3. Airwallex Sandbox
4. PayPal Sandbox
The payment provider acts as a test/payment infrastructure layer.
The SafePay risk and policy logic remains independent.
11. Project Goal
The goal is to build a working proof-of-concept that can demonstrate:
1. Risk assessment
2. Selective payment holding
3. Receiver confirmation
4. Rejection/reporting
5. Settlement
6. Linked reversal
7. Transaction lineage
8. Investigation workflow
9. Configurable payment policies
10. Integration with multiple payment-provider test environments
The final system should be suitable for demonstration to fintech companies, banks, payment technology companies, researchers, and financial-infrastructure organisations.
