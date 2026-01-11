import React from 'react';
import { Trash2, Calendar, Clock } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext.jsx"; 

const TransactionCard = ({ item, type, onDelete }) => {
    const { darkMode } = useTheme(); 
    
    const isIncome = type?.toLowerCase() === "income" || item?.type?.toLowerCase() === "income";

    return (
        <div className={`p-4 md:p-5 rounded-2xl md:rounded-[2rem] border flex justify-between items-center animate-in fade-in zoom-in-95 duration-300 transition-all ${
            darkMode 
            ? "bg-slate-800 border-slate-700 hover:border-slate-600 shadow-lg shadow-black/20" 
            : "bg-white border-slate-100 hover:shadow-md"
        }`}>
            <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                {/* Responsive Icon Size */}
                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex-shrink-0 flex items-center justify-center text-xl md:text-2xl shadow-sm transition-colors ${
                    isIncome 
                    ? (darkMode ? 'bg-green-500/10 text-green-500' : 'bg-green-50') 
                    : (darkMode ? 'bg-red-500/10 text-red-500' : 'bg-red-50')
                }`}>
                    {item.icon || "💸"}
                </div>
                
                <div className="overflow-hidden">
                    <h3 className={`text-sm md:text-lg font-bold truncate transition-colors ${
                        darkMode ? 'text-white' : 'text-slate-800'
                    }`}>
                        {item.category || item.incomeTitle || item.expenseTitle}
                    </h3>
                    {/* Stack date/time on very small screens */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-400 text-[10px] md:text-sm font-medium mt-0.5">
                        <span className="flex items-center gap-1">
                            <Calendar size={12} className="md:w-[14px]" /> 
                            {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={12} className="md:w-[14px]" /> 
                            {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6 ml-2">
                <div className="text-right min-w-[70px] md:min-w-[100px]">
                    <p className={`text-sm md:text-xl font-black ${isIncome ? 'text-green-500' : 'text-red-500'}`}>
                        {isIncome ? '+' : '-'} ₹{Number(item.amount).toLocaleString('en-IN')}
                    </p>
                    <p className={`text-[8px] md:text-[10px] font-bold uppercase tracking-widest ${
                        isIncome ? 'text-green-400/80' : 'text-red-400/80'
                    }`}>
                        {isIncome ? 'Income' : 'Expense'}
                    </p>
                </div>

                <button 
                    onClick={() => onDelete(item._id)} 
                    className={`w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center rounded-lg md:rounded-xl transition-all ${
                        darkMode 
                        ? "bg-slate-700 text-slate-400 hover:bg-red-500/20 hover:text-red-400" 
                        : "bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500"
                    }`}
                >
                    <Trash2 size={16} className="md:w-[18px]" />
                </button>
            </div>
        </div>
    );
};

export default TransactionCard;