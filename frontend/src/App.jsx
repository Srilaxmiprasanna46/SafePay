import {
  ShieldCheck,
  LayoutDashboard,
  ArrowLeftRight,
  TriangleAlert,
  ShieldAlert,
  Search,
  Bell,
  ChevronDown,
  ArrowUpRight,
  ArrowDownLeft,
  Clock3,
} from "lucide-react";

const transactions = [
  {
    id: "TX-001",
    from: "Alice Morgan",
    to: "Bob Wilson",
    amount: "₹50,000",
    risk: "High",
    status: "Pending",
  },
  {
    id: "TX-002",
    from: "Rahul Sharma",
    to: "Priya Rao",
    amount: "₹2,500",
    risk: "Low",
    status: "Settled",
  },
  {
    id: "TX-003",
    from: "Neha Patel",
    to: "Arjun Kumar",
    amount: "₹18,000",
    risk: "Medium",
    status: "Warning",
  },
];

function App() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
          <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h1 className="font-semibold tracking-tight">SafePay</h1>
              <p className="text-xs text-slate-500">
                Risk intelligence
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
            <NavItem icon={<ArrowLeftRight size={18} />} label="Payments" />
            <NavItem icon={<ShieldAlert size={18} />} label="Risk" />
            <NavItem icon={<TriangleAlert size={18} />} label="Investigations" />
            <NavItem icon={<ArrowLeftRight size={18} />} label="Lineage" />
          </nav>

          <div className="border-t border-slate-200 p-4">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Environment</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium">Mock Payment Rail</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Header */}
          <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6">
            <div>
              <p className="text-sm text-slate-500">Overview</p>
              <h2 className="text-xl font-semibold tracking-tight">
                SafePay Command Center
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-xl border border-slate-200 p-2.5 hover:bg-slate-50">
                <Search size={18} />
              </button>

              <button className="relative rounded-xl border border-slate-200 p-2.5 hover:bg-slate-50">
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </button>

              <div className="hidden items-center gap-3 border-l border-slate-200 pl-4 sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  SP
                </div>
                <div>
                  <p className="text-sm font-medium">SafePay Admin</p>
                  <p className="text-xs text-slate-500">Operations</p>
                </div>
                <ChevronDown size={16} className="text-slate-400" />
              </div>
            </div>
          </header>

          <div className="space-y-6 p-6">
            {/* Metrics */}
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label="Processed volume"
                value="₹12.4L"
                change="+12.8%"
                positive
              />

              <MetricCard
                label="Transactions"
                value="248"
                change="+8.4%"
                positive
              />

              <MetricCard
                label="At risk"
                value="7"
                change="3 need action"
                warning
              />

              <MetricCard
                label="Protection rate"
                value="98.7%"
                change="+1.2%"
                positive
              />
            </section>

            {/* Main cards */}
            <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Risk activity
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">
                      Payment safety overview
                    </h3>
                  </div>

                  <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
                    Last 7 days
                  </button>
                </div>

                <div className="mt-8 flex h-56 items-end gap-3">
                  {[42, 58, 48, 72, 64, 84, 70, 92, 76, 88, 68, 96].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex flex-1 items-end"
                      >
                        <div
                          className="w-full rounded-t-lg bg-slate-900 transition hover:bg-slate-700"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    )
                  )}
                </div>

                <div className="mt-4 flex justify-between text-xs text-slate-400">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>

              {/* Pending action */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Needs attention
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">
                      Pending confirmations
                    </h3>
                  </div>

                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                    3 pending
                  </span>
                </div>

                <div className="mt-6 rounded-xl border border-red-100 bg-red-50/60 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold">
                        ₹50,000
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        Alice → Bob
                      </p>
                    </div>

                    <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
                      HIGH
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    <Clock3 size={14} />
                    Awaiting receiver confirmation
                  </div>

                  <button className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
                    Review transaction
                  </button>
                </div>
              </div>
            </section>

            {/* Transactions */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 p-6">
                <div>
                  <p className="text-sm text-slate-500">
                    Transaction monitoring
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">
                    Recent payments
                  </h3>
                </div>

                <button className="text-sm font-medium text-slate-700 hover:text-slate-900">
                  View all
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
                      <th className="px-6 py-4">Transaction</th>
                      <th className="px-6 py-4">Flow</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Risk</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {transactions.map((tx) => (
                      <tr
                        key={tx.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                      >
                        <td className="px-6 py-5">
                          <p className="font-medium">{tx.id}</p>
                        </td>

                        <td className="px-6 py-5">
                          <div>
                            <p className="font-medium">{tx.from}</p>
                            <p className="text-xs text-slate-400">
                              → {tx.to}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-5 font-medium">
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
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-slate-900 text-white"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function MetricCard({ label, value, change, positive, warning }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>

      <div className="mt-3 flex items-end justify-between">
        <h3 className="text-2xl font-semibold tracking-tight">{value}</h3>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            warning
              ? "bg-amber-50 text-amber-700"
              : positive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}

function RiskBadge({ risk }) {
  const styles = {
    Low: "bg-emerald-50 text-emerald-700",
    Medium: "bg-amber-50 text-amber-700",
    High: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[risk]}`}
    >
      {risk}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Settled: "bg-emerald-50 text-emerald-700",
    Pending: "bg-red-50 text-red-700",
    Warning: "bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default App;