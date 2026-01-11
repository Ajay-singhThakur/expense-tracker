import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar.jsx";
import TransactionCard from "../../components/Cards/TransactionCard.jsx";
import AddEntryModal from "../../components/Modals/AddEntryModal.jsx";
import API from "../../utils/api.js";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { darkMode } = useTheme();

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
    <div className={`flex flex-col md:flex-row min-h-screen transition-colors duration-300 ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
      <Sidebar />
      
      {/* Updated: ml-0 for mobile, ml-72 for desktop. Added mt-16 for mobile header spacing */}
      <main className="flex-1 ml-0 md:ml-72 p-4 md:p-10 mt-16 md:mt-0 transition-all">
        
        {/* Header Section: Stack on mobile (flex-col) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 md:mb-10">
          <div>
            <h1 className={`text-2xl md:text-3xl font-black ${darkMode ? "text-white" : "text-slate-800"}`}>Income Details</h1>
            <p className={`text-sm md:text-base ${darkMode ? "text-slate-400" : "text-slate-500 font-medium"}`}>Manage your incoming cash flows</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 md:px-6 md:py-3 rounded-2xl font-bold hover:bg-green-700 shadow-lg shadow-green-900/20 transition-all hover:-translate-y-1 w-full md:w-auto justify-center"
          >
            <Plus size={20} /> Add Income
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            /* RESPONSIVE SKELETON */
            [1, 2, 3].map((n) => (
              <div key={n} className={`flex items-center justify-between p-4 md:p-5 rounded-2xl md:rounded-[2rem] border animate-pulse ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}></div>
                  <div className="space-y-2">
                    <div className={`h-4 w-24 md:h-5 md:w-32 rounded-lg ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}></div>
                    <div className={`h-2 w-16 md:h-3 md:w-20 rounded-lg ${darkMode ? "bg-slate-600" : "bg-slate-100"}`}></div>
                  </div>
                </div>
                <div className={`h-6 w-20 md:h-8 md:w-24 rounded-xl ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}></div>
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
            <div className={`text-center py-16 md:py-20 rounded-[2rem] md:rounded-[2.5rem] border flex flex-col items-center ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}>
               <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 text-3xl md:text-4xl ${darkMode ? "bg-slate-700" : "bg-slate-50"}`}>💸</div>
               <p className="text-slate-400 text-sm md:text-base font-bold italic px-4 text-center">No income entries found yet.</p>
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