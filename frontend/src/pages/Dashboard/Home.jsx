import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar.jsx";
import API from "../../utils/api.js";
import { Wallet, TrendingUp, TrendingDown, Clock } from "lucide-react";
import FinancialPieChart from "../../components/Charts/FinancialPieChart.jsx";
import WeeklyBarChart from "../../components/Charts/WeeklyBarChart.jsx";
import { formatCurrency } from "../../utils/helper.js";
import { useUser } from "../../context/UserContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx"; 

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme(); 
  const context = useUser();
  const [stats, setStats] = useState({
    balance: 0, income: 0, expense: 0,
    recentTransactions: [], chartData: [], expensePieData: [],
  });

  if (!context || !context.user) return null;
  const { user } = context;

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [incRes, expRes] = await Promise.all([
          API.get("/income/get"),
          API.get("/expense/get"),
        ]);
        const incomes = (incRes.data.incomes || []).map(i => ({ ...i, type: "income" }));
        const expenses = (expRes.data.expenses || []).map(e => ({ ...e, type: "expense" }));
        
        const totalInc = incomes.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
        const totalExp = expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
        
        setStats({
          income: totalInc,
          expense: totalExp,
          balance: totalInc - totalExp,
          recentTransactions: [...incomes, ...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)),
          chartData: incomes.slice(0, 7).map(i => ({ name: i.category, amount: i.amount })),
          expensePieData: expenses.map(e => ({ name: e.category, value: Number(e.amount) })),
        });
      } finally { setLoading(false); }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} transition-colors duration-300`}>
      <Sidebar />

      <main className="flex-1 ml-72 p-10">
        {/* HEADER SECTION */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              Welcome, {user.fullName}!
            </h1>
            <p className={darkMode ? 'text-slate-400' : 'text-slate-500 font-medium'}>
              Monitor your financial health at a glance.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 font-semibold shadow-sm transition-colors ${
              darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-100 text-slate-600'
            }`}>
              <Clock size={18} /> {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <StatCard title="Total Balance" amount={stats.balance} icon={<Wallet size={24} />} color="blue" loading={loading} darkMode={darkMode} />
          <StatCard title="Total Income" amount={stats.income} icon={<TrendingUp size={24} />} color="green" loading={loading} darkMode={darkMode} />
          <StatCard title="Total Expense" amount={stats.expense} icon={<TrendingDown size={24} />} color="red" loading={loading} darkMode={darkMode} />
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartContainer title="Income Overview" darkMode={darkMode}>
            {loading ? <Skeleton height="h-72" /> : <WeeklyBarChart data={stats.chartData} dark={darkMode} />}
          </ChartContainer>

          <ChartContainer title="Expense Distribution" darkMode={darkMode}>
            {loading ? <Skeleton height="h-72" /> : stats.expensePieData.length > 0 ? <FinancialPieChart data={stats.expensePieData} dark={darkMode} /> : <p className="text-center text-slate-400 italic pt-20">No data</p>}
          </ChartContainer>
        </div>

        {/* RECENT TRANSACTIONS SECTION */}
        <div className={`mt-10 p-8 rounded-[2.5rem] border transition-colors ${darkMode ? 'bg-slate-800 border-slate-700 shadow-lg shadow-black/20' : 'bg-white border-slate-100 shadow-sm'}`}>
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Recent Transactions</h3>
          <div className="space-y-4">
            {loading ? (
                [1,2,3].map(n => <Skeleton key={n} height="h-20" />)
            ) : stats.recentTransactions.length > 0 ? (
                stats.recentTransactions.map((item, idx) => (
                    <TransactionRow key={idx} item={item} darkMode={darkMode} />
                ))
            ) : (
                <p className="text-center text-slate-400 italic py-4">No recent transactions</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const StatCard = ({ title, amount, icon, color, loading, darkMode }) => (
  <div className={`p-8 rounded-[2.5rem] border flex items-center justify-between transition-colors ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
    <div>
      <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{title}</p>
      {loading ? <div className={`h-9 w-32 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} animate-pulse mt-2 rounded-lg`} /> : <h2 className={`text-3xl font-black mt-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>{formatCurrency(amount)}</h2>}
    </div>
    <div className={`p-4 rounded-2xl bg-opacity-10 ${color === 'green' ? 'bg-green-500 text-green-500' : color === 'red' ? 'bg-red-500 text-red-500' : 'bg-blue-500 text-blue-500'}`}>{icon}</div>
  </div>
);

const ChartContainer = ({ title, children, darkMode }) => (
  <div className={`p-8 rounded-[2.5rem] border shadow-sm transition-colors ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
    <h3 className={`text-xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-slate-800'}`}>{title}</h3>
    <div className="h-72">{children}</div>
  </div>
);

const TransactionRow = ({ item, darkMode }) => {
  const isInc = item.type === "income";
  
  // Custom Date and Time formatting
  const dateFormatted = new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  const timeFormatted = new Date(item.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <div className={`flex items-center justify-between p-5 rounded-[2rem] border border-transparent transition-all ${darkMode ? 'bg-slate-900/50 hover:border-slate-700 text-slate-300' : 'bg-slate-50/50 hover:bg-slate-50 hover:border-slate-100'}`}>
      <div className="flex items-center gap-4">
        <span className={`text-2xl w-12 h-12 flex items-center justify-center rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-white shadow-sm'}`}>{item.icon || "💸"}</span>
        <div>
          <span className={`font-bold block ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{item.category}</span>
          
          {/* UPDATED DATE AND TIME DISPLAY */}
          <p className="text-[10px] text-slate-400 font-medium flex gap-1">
            <span>{dateFormatted}</span>
            <span>•</span>
            <span>{timeFormatted}</span>
          </p>
        </div>
      </div>
      <div className="text-right">
        <span className={`font-black text-lg ${isInc ? "text-green-500" : "text-red-500"}`}>{isInc ? "+" : "-"} {formatCurrency(item.amount)}</span>
        <p className={`text-[10px] font-bold uppercase tracking-widest ${isInc ? "text-green-400/70" : "text-red-400/70"}`}>
          {item.type}
        </p>
      </div>
    </div>
  );
};

const Skeleton = ({ height }) => <div className={`${height} w-full bg-slate-700/10 animate-pulse rounded-[2rem]`} />;

export default Home;