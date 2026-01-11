import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar.jsx";
import TransactionCard from "../../components/Cards/TransactionCard.jsx";
import AddEntryModal from "../../components/Modals/AddEntryModal.jsx";
import API from "../../utils/api.js";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx"; // Hook import kiya

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { darkMode } = useTheme(); // Theme state nikali

  const fetchExpenses = async () => {
    try {
      const { data } = await API.get("/expense/get");
      setExpenses(data.expenses || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData) => {
    try {
      const dataToSend = { ...formData };
      const now = new Date();
      const selectedDate = new Date(formData.date);
      
      selectedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
      dataToSend.date = selectedDate.toISOString();

      const tempId = Date.now().toString();
      const newExpense = { ...dataToSend, _id: tempId, type: 'expense' };
      setExpenses([newExpense, ...expenses]);
      
      setIsModalOpen(false);
      toast.success("Expense added!");

      await API.post("/expense/add", dataToSend);
      fetchExpenses();
    } catch (err) {
      toast.error("Failed to add expense");
      fetchExpenses();
    }
  };

  const handleDelete = async (id) => {
    const backup = [...expenses];
    setExpenses(expenses.filter((item) => item._id !== id));
    
    try {
      await API.delete(`/expense/${id}`);
      toast.success("Expense removed");
    } catch (err) {
      setExpenses(backup);
      toast.error("Delete failed. Restored.");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
      <Sidebar />
      <main className="flex-1 ml-72 p-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className={`text-3xl font-black ${darkMode ? "text-white" : "text-slate-800"}`}>Expenses</h1>
            <p className={darkMode ? "text-slate-400" : "text-slate-500 font-medium"}>Track your spending patterns</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-600 shadow-lg shadow-red-900/20 transition-all hover:-translate-y-1"
          >
            <Plus size={20} /> Add Expense
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            /* DARK MODE SKELETONS */
            [1, 2, 3].map((n) => (
              <div key={n} className={`flex items-center justify-between p-5 rounded-[2rem] border animate-pulse ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}></div>
                  <div className="space-y-3">
                    <div className={`h-5 w-32 rounded-lg ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}></div>
                    <div className={`h-3 w-20 rounded-lg ${darkMode ? "bg-slate-600" : "bg-slate-100"}`}></div>
                  </div>
                </div>
                <div className={`h-8 w-24 rounded-xl ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}></div>
              </div>
            ))
          ) : expenses.length > 0 ? (
            expenses.map((item) => (
              <TransactionCard
                key={item._id}
                item={item}
                type="expense"
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className={`text-center py-20 rounded-[2.5rem] border flex flex-col items-center ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}>
               <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 text-4xl ${darkMode ? "bg-slate-700" : "bg-slate-50"}`}>💸</div>
               <p className="text-slate-400 font-bold italic">No expenses recorded yet.</p>
            </div>
          )}
        </div>
      </main>

      <AddEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAdd}
        title="Add Expense"
        type="expense"
      />
    </div>
  );
};

export default Expense;