# SafePay Technical Architecture

## 1. Architecture Goal

SafePay is designed as a provider-independent payment-security layer.

The core SafePay logic must not depend on Razorpay, Airwallex, PayPal, or any specific payment provider.

Payment providers are connected through adapters.

---

## 2. High-Level Architecture

```text
                         SAFE-PAY
                            |
          +-----------------+-----------------+
          |                                   |
     Frontend UI                         Backend API
          |                                   |
          |                    +--------------+--------------+
          |                    |              |              |
          |               Risk Engine   Policy Engine   Transaction
          |                    |              |           Service
          |                    |              |              |
          |                    +--------------+--------------+
          |                                   |
          |                            PostgreSQL DB
          |                                   |
          |                         Payment Adapter Layer
          |                                   |
          |              +--------------------+--------------------+
          |              |                    |                    |
          |          Mock Adapter        Razorpay Adapter    Airwallex Adapter
          |                                                        |
          |                                                   PayPal Adapter
---

3. Frontend
Technology:
- React
- Vite
- JavaScript
- Recharts
- React Flow
The frontend provides interfaces for:
Sender
- Create payment
- Enter recipient
- Enter amount
- View payment status
- View warnings
Receiver
- View incoming payment
- View confirmation request
- Accept payment
- Reject payment
- Report suspicious payment
Investigator/Admin
- View risk assessment
- View transactions
- View transaction lineage
- View investigation cases
- View audit logs
- View policy configuration
---

4. Backend
Technology:
- Node.js
- Express
The backend is responsible for:
- Authentication
- Transaction creation
- Risk assessment
- Policy evaluation
- State transitions
- Receiver confirmation
- Settlement simulation
- Reversal
- Transaction lineage
- Provider integration
- Webhook processing
- Audit logging
---

5. Core Backend Services
Transaction Service
Responsible for:
- Creating transactions
- Maintaining transaction state
- Updating transaction status
- Creating reversals
- Linking transactions
Risk Engine
Responsible for calculating the risk score.
Input:
Transaction
+
User history
+
Device information
+
Location information
+
Behavioural information

Output:
Risk Score
Risk Level
Triggered Rules

The first version will use explainable rule-based scoring.
Machine-learning models may be added later.
Policy Engine
Responsible for deciding what happens after risk assessment.
Example:
LOW
→ INSTANT_SETTLEMENT

MEDIUM
→ WARNING

HIGH
→ RECEIVER_CONFIRMATION

CRITICAL
→ TEMPORARY_HOLD

The Policy Engine must remain independent of the payment provider.
Confirmation Service
Responsible for:
- Creating confirmation requests
- Recording receiver decisions
- Handling confirmation expiry
- Triggering the next transaction state
Possible responses:
ACCEPT
REJECT
REPORT

Lineage Service
Responsible for:
- Linking reversals
- Linking related transactions
- Building transaction graphs
- Providing investigation history
Investigation Service
Responsible for:
- Creating investigation cases
- Recording reports
- Showing related transactions
- Providing evidence and audit history
Audit Service
Every important action should be recorded.
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
---

6. Payment Adapter Layer
SafePay uses a common interface for payment providers.
Conceptually:
PaymentAdapter

createPayment()
getPaymentStatus()
settlePayment()
reversePayment()
handleWebhook()

Provider-specific implementations:
MockPaymentAdapter
RazorpayAdapter
AirwallexAdapter
PayPalAdapter

The rest of SafePay should never directly call provider-specific APIs.
---

7. Why the Adapter Pattern?
Without adapters:
Risk Engine
   |
Razorpay code
   |
Airwallex code
   |
PayPal code

This would tightly couple the system to providers.
With adapters:
              SafePay Core
                   |
             PaymentAdapter
                   |
       +-----------+-----------+
       |           |           |
      Mock     Razorpay    Airwallex
                              |
                            PayPal

This allows the payment provider to be changed without changing the SafePay policy.
---

8. Transaction State Machine
A transaction follows controlled state transitions.
INITIATED
    |
    v
RISK_ASSESSED
    |
    +----------------------+
    |                      |
 LOW/MEDIUM             HIGH/CRITICAL
    |                      |
    v                      v
DIRECT/WARNING           HELD
                           |
                  +--------+--------+
                  |        |        |
               ACCEPT    REJECT   REPORT
                  |        |        |
                  v        v        v
               SETTLED  REVERSED INVESTIGATION

Additional state:
HELD
  |
  v
EXPIRED

The expiry policy is controlled by the Policy Engine.
---

9. Database Architecture
PostgreSQL will store:
users
accounts
transactions
risk_assessments
policy_rules
confirmations
transaction_links
provider_events
audit_logs
investigation_cases

Important principle
The internal SafePay transaction ID is the primary identity.
Provider transaction IDs are stored as external references.
Example:
SafePay ID: T001
Provider: Razorpay
Provider ID: pay_xxxxx

This allows SafePay to remain provider-independent.
---

10. Transaction Flow
Low-Risk Payment
Sender
  |
  v
Create Transaction
  |
  v
Risk Engine
  |
  v
LOW
  |
  v
Policy Engine
  |
  v
Payment Adapter
  |
  v
Settlement

High-Risk Payment
Sender
  |
  v
Create Transaction
  |
  v
Risk Engine
  |
  v
HIGH
  |
  v
Policy Engine
  |
  v
HOLD
  |
  v
Receiver Notification
  |
  +---------+---------+
  |         |         |
Accept    Reject    Report
  |         |         |
  v         v         v
Settle    Reverse  Investigation
---

11. Provider Webhooks
Provider webhooks are treated as external events.
Flow:
Provider
   |
   v
Webhook Endpoint
   |
   v
Signature Verification
   |
   v
Event Normalization
   |
   v
Transaction Service
   |
   v
State Update
   |
   v
Audit Log

Webhook processing must be idempotent.
Duplicate webhook events must not cause duplicate settlement or reversal actions.
---

12. API Architecture
Initial API structure:
/api/auth
/api/users
/api/accounts

/api/transactions
/api/transactions/:id
/api/transactions/:id/assess
/api/transactions/:id/confirm
/api/transactions/:id/reverse
/api/transactions/:id/lineage

/api/risk
/api/policies

/api/investigations
/api/audit

/api/webhooks/:provider

/api/metrics
---

13. Security Architecture
The prototype must follow these principles:
- Provider secrets stored only in environment variables
- .env excluded from Git
- API authentication
- Role-based authorization
- Webhook signature verification
- Input validation
- Idempotency
- Audit logging
- No real payment credentials
- No real-money transactions
---

14. Environment Separation
SafePay will have:
Development
     |
     v
Mock Payment Rail
     |
     v
Provider Sandbox
     |
     v
Production (NOT part of this project)

Production payment integration is outside the scope of SafePay v1.
---

15. Provider Integration Roadmap
Phase 1
Mock Payment Adapter
Purpose:
Build and validate the SafePay policy mechanism without external dependencies.
Phase 2
Razorpay Sandbox
Purpose:
Demonstrate integration with an Indian payment technology ecosystem.
Phase 3
Airwallex Sandbox
Purpose:
Demonstrate integration with a global payment infrastructure provider.
Phase 4
PayPal Sandbox
Purpose:
Demonstrate integration with another global payment ecosystem.
---

16. Design Principle
The most important architectural rule is:
SafePay policy logic must never depend on a specific payment provider.

The provider is the payment rail.
SafePay is the safety layer.
---

17. Architecture Objective
The final architecture should demonstrate:
Provider Independence
        +
Risk Intelligence
        +
Policy Control
        +
Receiver Awareness
        +
Transaction Traceability
        =
SafePay


### Commit it

Use:

```text
docs: define SafePay architecture
