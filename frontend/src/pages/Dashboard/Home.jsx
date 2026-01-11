import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar.jsx";
import API from "../../utils/api.js";
import { Wallet, TrendingUp, TrendingDown, Clock } from "lucide-react";
import FinancialPieChart from "../../components/Charts/FinancialPieChart.jsx";
import WeeklyBarChart from "../../components/Charts/WeeklyBarChart.jsx";
import { formatCurrency } from "../../utils/helper.js";
import { useUser } from "../../context/UserContext.jsx";

const Home = () => {
  // 1. Get the context safely
  const context = useUser();

  // 2. State management
  const [stats, setStats] = useState({
    balance: 0,
    income: 0,
    expense: 0,
    recentTransactions: [],
    chartData: [],
    expensePieData: [],
  });

  // 3. Safety Check: If context is not ready, don't render the rest (prevents white screen)
  if (!context || !context.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-500 font-medium animate-pulse">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  const { user } = context;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [incRes, expRes] = await Promise.all([
          API.get("/income/get"),
          API.get("/expense/get"),
        ]);

        // 1. Extract data safely from backend response
        const incomes = incRes.data.incomes || [];
        const expenses = expRes.data.expenses || [];

        // 2. Calculate totals
        const totalInc = incomes.reduce(
          (sum, item) => sum + (Number(item.amount) || 0),
          0
        );
        const totalExp = expenses.reduce(
          (sum, item) => sum + (Number(item.amount) || 0),
          0
        );

        // 3. Create the list for Recent Transactions (This replaces the broken 'combined' variable)
        const allTransactions = [...incomes, ...expenses].sort((a, b) => {
          return (
            new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
          );
        });

        // 4. Group individual expenses for the Pie Chart
        const expenseDataForChart = expenses.map((exp) => ({
          name: exp.category || "Other",
          value: Number(exp.amount) || 0,
        }));

        // 5. Update state
        setStats({
          income: totalInc,
          expense: totalExp,
          balance: totalInc - totalExp,
          recentTransactions: allTransactions, 
          chartData: incomes
            .slice(0, 7)
            .map((i) => ({ name: i.category, amount: i.amount })),
          expensePieData: expenseDataForChart,
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 ml-72 p-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Welcome, {user.fullName}!
            </h1>
            <p className="text-slate-500 font-medium">
              Monitor your financial health at a glance.
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2 text-slate-600 font-semibold">
            <Clock size={18} /> {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <StatCard
            title="Total Balance"
            amount={stats.balance}
            icon={<Wallet size={24} />}
            color="blue"
          />
          <StatCard
            title="Total Income"
            amount={stats.income}
            icon={<TrendingUp size={24} />}
            color="green"
          />
          <StatCard
            title="Total Expense"
            amount={stats.expense}
            icon={<TrendingDown size={24} />}
            color="red"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-8 text-slate-800">
              Income Overview
            </h3>
            <div className="h-72">
              <WeeklyBarChart data={stats.chartData} />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-8 text-slate-800">
              Expense Distribution
            </h3>
            <div className="h-72">
              {/* Add a conditional check: only show chart if there is data */}
              {stats.expensePieData.length > 0 ? (
                <FinancialPieChart data={stats.expensePieData} />
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">
                  No expenses recorded yet.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-6 text-slate-800">
            {" "}
            Transactions
          </h3>
          <div className="space-y-4">
            {stats.recentTransactions.length > 0 ? (
              stats.recentTransactions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-bold text-slate-700">
                      {item.category}
                    </span>
                    <p className="text-xs text-slate-400">
                      {(() => {
                        // We use createdAt because it has the exact real-world time
                        const dateObj = new Date(item.createdAt || item.date);

                        return dateObj.toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        });
                      })()}
                    </p>
                  </div>
                  <span
                    className={`font-black ${
                      item.type === "income" || stats.income >= item.amount
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-center py-4">
                No recent transactions
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, amount, icon, color }) => {
  const themes = {
    blue: "bg-blue-600 text-blue-600 border-blue-100",
    green: "bg-green-600 text-green-600 border-green-100",
    red: "bg-red-500 text-red-500 border-red-100",
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">
          {title}
        </p>
        <h2 className="text-3xl font-black mt-2 text-slate-800">
          {formatCurrency(amount)}
        </h2>
      </div>
      <div
        className={`p-4 rounded-2xl bg-opacity-10 ${
          themes[color].split(" ")[0]
        }`}
      >
        <div className={themes[color].split(" ")[1]}>{icon}</div>
      </div>
    </div>
  );
};

export default Home;
