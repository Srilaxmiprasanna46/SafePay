import { useState, type ReactNode } from "react"
import {
  ArrowLeftRight,
  Bell,
  ChevronDown,
  Clock3,
  GitBranch,
  LayoutDashboard,
  Search,
  ShieldAlert,
  ShieldCheck,
  TriangleAlert,
  TrendingUp,
  X,
} from "lucide-react"

const transactions = [
  {
    id: "TX-7F29A",
    from: "Alice Morgan",
    to: "Bob Wilson",
    amount: "₹50,000",
    risk: "HIGH",
    status: "Pending",
  },
  {
    id: "TX-91BC2",
    from: "Rahul Sharma",
    to: "Priya Rao",
    amount: "₹2,500",
    risk: "LOW",
    status: "Settled",
  },
  {
    id: "TX-43KD8",
    from: "Neha Patel",
    to: "Arjun Kumar",
    amount: "₹18,000",
    risk: "MEDIUM",
    status: "Warning",
  },
  {
    id: "TX-22LM4",
    from: "Vikram Rao",
    to: "Meera Shah",
    amount: "₹7,500",
    risk: "LOW",
    status: "Settled",
  },
]

const bars = [38, 52, 45, 68, 57, 74, 61, 86, 72, 91, 79, 96]

export function App() {
  const [showReview, setShowReview] = useState(false)
  const [decision, setDecision] = useState<
    "ACCEPT" | "REJECT" | "REPORT" | null
  >(null)

  const handleDecision = (
    selectedDecision: "ACCEPT" | "REJECT" | "REPORT"
  ) => {
    setDecision(selectedDecision)
  }

  const closeReview = () => {
    setShowReview(false)
    setDecision(null)
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-[250px] shrink-0 flex-col border-r border-slate-200 bg-[#101828] text-white lg:flex">
          <div className="flex h-[76px] items-center gap-3 border-b border-white/10 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#101828]">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <div className="text-[15px] font-semibold tracking-tight">
                SafePay
              </div>

              <div className="text-xs text-slate-400">
                Risk intelligence
              </div>
            </div>
          </div>

          <div className="px-4 pt-6">
            <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Workspace
            </p>

            <nav className="space-y-1">
              <SidebarItem
                icon={<LayoutDashboard className="h-4 w-4" />}
                label="Dashboard"
                active
              />

              <SidebarItem
                icon={<ArrowLeftRight className="h-4 w-4" />}
                label="Payments"
              />

              <SidebarItem
                icon={<ShieldAlert className="h-4 w-4" />}
                label="Risk Center"
              />

              <SidebarItem
                icon={<TriangleAlert className="h-4 w-4" />}
                label="Investigations"
              />

              <SidebarItem
                icon={<GitBranch className="h-4 w-4" />}
                label="Transaction Lineage"
              />
            </nav>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-xs font-medium text-slate-200">
                  Mock payment rail
                </span>
              </div>

              <p className="mt-2 text-[11px] leading-5 text-slate-500">
                Development environment
              </p>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="min-w-0 flex-1">

          {/* HEADER */}
          <header className="flex h-[76px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
            <div>
              <p className="text-xs font-medium text-slate-400">
                Security operations
              </p>

              <h1 className="mt-1 text-xl font-semibold tracking-tight">
                Command Center
              </h1>
            </div>

            <div className="flex items-center gap-2">

              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50">
                <Search className="h-4 w-4" />
              </button>

              <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50">
                <Bell className="h-4 w-4" />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </button>

              <div className="ml-2 hidden items-center gap-3 border-l border-slate-200 pl-4 sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                  SP
                </div>

                <div className="hidden xl:block">
                  <div className="text-sm font-semibold">
                    SafePay Admin
                  </div>

                  <div className="text-[11px] text-slate-400">
                    Operations
                  </div>
                </div>

                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </header>

          <div className="space-y-6 p-5 sm:p-8">

            {/* INTRO */}
            <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm text-slate-500">
                  Wednesday, October 7
                </p>

                <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                  Payment safety overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Monitor risk, intervention, and transaction activity.
                </p>
              </div>

              <button
                onClick={() => setShowReview(true)}
                className="w-fit rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
              >
                Review alerts
              </button>
            </section>

            {/* METRICS */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <Metric
                label="Processed volume"
                value="₹12.4L"
                detail="+12.8% vs last week"
                trend="up"
              />

              <Metric
                label="Transactions"
                value="248"
                detail="+8.4% vs last week"
                trend="up"
              />

              <Metric
                label="Transactions at risk"
                value="7"
                detail="3 require action"
                trend="warning"
              />

              <Metric
                label="Protection rate"
                value="98.7%"
                detail="+1.2% vs last week"
                trend="up"
              />

            </section>

            {/* CHART + PENDING */}
            <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">

              {/* RISK ACTIVITY */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.03)] sm:p-6">

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                      Risk activity
                    </p>

                    <h3 className="mt-2 text-lg font-semibold">
                      Safety events
                    </h3>
                  </div>

                  <div className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600">
                    Last 7 days
                  </div>
                </div>

                <div className="mt-8 flex h-52 items-end gap-2 sm:gap-3">
                  {bars.map((height, index) => (
                    <div
                      key={index}
                      className="flex h-full flex-1 items-end"
                    >
                      <div
                        className="w-full rounded-t-md bg-slate-900 transition hover:bg-slate-700"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between text-[11px] text-slate-400">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  Risk interventions are trending lower this week
                </div>
              </div>

              {/* PENDING CONFIRMATION */}
              <div className="rounded-2xl border border-red-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.03)] sm:p-6">

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-red-500">
                      Needs attention
                    </p>

                    <h3 className="mt-2 text-lg font-semibold">
                      Pending confirmation
                    </h3>
                  </div>

                  <div className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600">
                    HIGH
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-[#fff7f7] p-5">

                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-2xl font-semibold tracking-tight">
                        ₹50,000
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Alice Morgan → Bob Wilson
                      </p>
                    </div>

                    <ShieldAlert className="h-5 w-5 text-red-500" />
                  </div>

                  <div className="mt-5 space-y-3">
                    <Reason text="First-time payment relationship" />
                    <Reason text="New device detected" />
                    <Reason text="Unusual location pattern" />
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                    <Clock3 className="h-3.5 w-3.5" />
                    Awaiting receiver confirmation
                  </div>

                  <button
                    onClick={() => setShowReview(true)}
                    className="mt-5 w-full rounded-xl bg-slate-900 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    Review payment
                  </button>
                </div>
              </div>
            </section>

            {/* TRANSACTIONS */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.03)]">

              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-6">

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                    Monitoring
                  </p>

                  <h3 className="mt-2 text-lg font-semibold">
                    Recent transactions
                  </h3>
                </div>

                <button className="text-sm font-medium text-slate-600 hover:text-slate-900">
                  View all
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-sm">

                  <thead>
                    <tr className="border-b border-slate-100 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      <th className="px-6 py-4">Transaction</th>
                      <th className="px-6 py-4">Payment flow</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Risk</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {transactions.map((tx) => (
                      <tr
                        key={tx.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                      >
                        <td className="px-6 py-5">
                          <div className="font-medium text-slate-900">
                            {tx.id}
                          </div>

                          <div className="mt-1 text-xs text-slate-400">
                            Instant P2P
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div>
                            <div className="font-medium">
                              {tx.from}
                            </div>

                            <div className="text-xs text-slate-400">
                              {tx.to}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5 font-semibold">
                          {tx.amount}
                        </td>

                        <td className="px-6 py-5">
                          <RiskBadge risk={tx.risk} />
                        </td>

                        <td className="px-6 py-5">
                          <StatusBadge status={tx.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </section>

            {/* FOOTER */}
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    SafePay protection is active
                  </p>

                  <p className="text-xs text-slate-400">
                    Risk engine and policy engine are operational.
                  </p>
                </div>
              </div>

              <div className="text-xs font-medium text-slate-400">
                MOCK • DEVELOPMENT
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* REVIEW MODAL */}
      {showReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">

            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-500">
                  High-risk transaction
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  Review payment
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Receiver confirmation is required before settlement.
                </p>
              </div>

              <button
                onClick={closeReview}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5">

              <p className="text-sm text-slate-500">
                Payment amount
              </p>

              <p className="mt-1 text-3xl font-semibold">
                ₹50,000
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Alice Morgan → Bob Wilson
              </p>
            </div>

            <div className="mt-5 space-y-3">
              <Reason text="First-time payment relationship" />
              <Reason text="New device detected" />
              <Reason text="Unusual location pattern" />
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-red-100 bg-red-50 px-4 py-3">

              <span className="text-sm font-medium text-slate-600">
                SafePay risk score
              </span>

              <span className="text-xl font-semibold text-red-600">
                75 · HIGH
              </span>
            </div>

            {!decision ? (
              <div className="mt-6 grid grid-cols-3 gap-3">

                <button
                  onClick={() => handleDecision("ACCEPT")}
                  className="rounded-xl bg-emerald-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleDecision("REJECT")}
                  className="rounded-xl bg-slate-900 px-3 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Reject
                </button>

                <button
                  onClick={() => handleDecision("REPORT")}
                  className="rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                >
                  Report
                </button>

              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">

                <div className="text-center">

                  <p className="text-sm text-slate-500">
                    Decision selected
                  </p>

                  <p className="mt-2 text-xl font-semibold">
                    {decision}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Backend integration comes next.
                  </p>

                  <button
                    onClick={closeReview}
                    className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                  >
                    Close
                  </button>

                </div>
              </div>
            )}

            <p className="mt-4 text-center text-xs text-slate-400">
              This payment is protected by SafePay until a decision is made.
            </p>

          </div>
        </div>
      )}
    </div>
  )
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: ReactNode
  label: string
  active?: boolean
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-white text-slate-950 shadow-sm"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function Metric({
  label,
  value,
  detail,
  trend,
}: {
  label: string
  value: string
  detail: string
  trend: "up" | "warning"
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>

      <div className="mt-4 flex items-end justify-between gap-3">

        <p className="text-2xl font-semibold tracking-tight">
          {value}
        </p>

        {trend === "up" ? (
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
            {detail}
          </span>
        ) : (
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
            {detail}
          </span>
        )}

      </div>
    </div>
  )
}

function Reason({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-600">
      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
      {text}
    </div>
  )
}

function RiskBadge({ risk }: { risk: string }) {
  const classes = {
    LOW: "bg-emerald-50 text-emerald-700",
    MEDIUM: "bg-amber-50 text-amber-700",
    HIGH: "bg-red-50 text-red-700",
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        classes[risk as keyof typeof classes]
      }`}
    >
      {risk}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  const classes = {
    Settled: "bg-emerald-50 text-emerald-700",
    Pending: "bg-red-50 text-red-700",
    Warning: "bg-amber-50 text-amber-700",
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        classes[status as keyof typeof classes]
      }`}
    >
      {status}
    </span>
  )
}