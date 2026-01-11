import React from 'react';
import { Trash2, Calendar, Clock } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext.jsx"; 

const TransactionCard = ({ item, type, onDelete }) => {
    const { darkMode } = useTheme(); 
    
    const isIncome = type?.toLowerCase() === "income" || item?.type?.toLowerCase() === "income";

    return (
        <div className={`p-5 rounded-[2rem] border flex justify-between items-center animate-in fade-in zoom-in-95 duration-300 transition-all ${
            darkMode 
            ? "bg-slate-800 border-slate-700 hover:border-slate-600 shadow-lg shadow-black/20" 
            : "bg-white border-slate-100 hover:shadow-md"
        }`}>
            <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-colors ${
                    isIncome 
                    ? (darkMode ? 'bg-green-500/10 text-green-500' : 'bg-green-50') 
                    : (darkMode ? 'bg-red-500/10 text-red-500' : 'bg-red-50')
                }`}>
                    {item.icon || "💸"}
                </div>
                
                <div>
                    <h3 className={`text-lg font-bold transition-colors ${
                        darkMode ? 'text-white' : 'text-slate-800'
                    }`}>
                        {item.category || item.incomeTitle || item.expenseTitle}
                    </h3>
                    <div className="flex items-center gap-3 text-slate-400 text-sm font-medium mt-1">
                        <span className="flex items-center gap-1">
                            <Calendar size={14} /> 
                            {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={14} /> 
                            {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right">
                    {/* YAHAN FIX KIYA HAI: isInc ko isIncome kiya */}
                    <p className={`text-xl font-black ${isIncome ? 'text-green-500' : 'text-red-500'}`}>
                        {isIncome ? '+' : '-'} ₹{Number(item.amount).toLocaleString('en-IN')}
                    </p>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${
                        isIncome ? 'text-green-400/80' : 'text-red-400/80'
                    }`}>
                        {isIncome ? 'Income' : 'Expense'}
                    </p>
                </div>

                <button 
                    onClick={() => onDelete(item._id)} 
                    className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
                        darkMode 
                        ? "bg-slate-700 text-slate-400 hover:bg-red-500/20 hover:text-red-400" 
                        : "bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500"
                    }`}
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default TransactionCard;