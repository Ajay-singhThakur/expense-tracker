import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar.jsx";
import TransactionCard from "../../components/Cards/TransactionCard.jsx";
import AddEntryModal from "../../components/Modals/AddEntryModal.jsx";
import API from "../../utils/api.js";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx"; // Theme Hook Import kiya

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { darkMode } = useTheme(); // Dark Mode state nikaali

  const fetchIncomes = async () => {
    try {
      const { data } = await API.get("/income/get");
      setIncomes(data.incomes || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to load data");
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

      const tempId = Date.now();
      const newIncome = { ...dataToSend, _id: tempId, type: 'income' };
      setIncomes([newIncome, ...incomes]);
      
      setIsModalOpen(false);
      toast.success("Income added!");

      await API.post("/income/add", dataToSend);
      fetchIncomes();
    } catch (err) {
      toast.error("Failed to add income");
      fetchIncomes();
    }
  };

  const handleDelete = async (id) => {
    const backup = [...incomes];
    setIncomes(incomes.filter((item) => item._id !== id));
    
    try {
      await API.delete(`/income/${id}`);
      toast.success("Income deleted");
    } catch (err) {
      setIncomes(backup);
      toast.error("Delete failed. Item restored.");
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
      <Sidebar />
      <main className="flex-1 ml-72 p-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className={`text-3xl font-black ${darkMode ? "text-white" : "text-slate-800"}`}>Income Details</h1>
            <p className={darkMode ? "text-slate-400" : "text-slate-500 font-medium"}>Manage all your incoming cash flows</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-700 shadow-lg shadow-green-900/20 transition-all hover:-translate-y-1"
          >
            <Plus size={20} /> Add Income
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            /* DARK MODE READY SKELETON */
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
          ) : incomes.length > 0 ? (
            incomes.map((item) => (
              <TransactionCard
                key={item._id}
                item={item}
                type="income"
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className={`text-center py-20 rounded-[2.5rem] border flex flex-col items-center ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}>
               <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 text-4xl ${darkMode ? "bg-slate-700" : "bg-slate-50"}`}>💸</div>
               <p className="text-slate-400 font-bold italic">No income entries found yet.</p>
            </div>
          )}
        </div>
      </main>

      <AddEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAdd}
        title="Add Income"
        type="income"
      />
    </div>
  );
};

export default Income;