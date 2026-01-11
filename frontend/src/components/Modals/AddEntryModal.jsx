import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext.jsx"; 

const AddEntryModal = ({ isOpen, onClose, onAdd, title, type }) => {
    const { darkMode } = useTheme(); 
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        icon: '💸'
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.amount || !formData.category) return;
        onAdd(formData);
        setFormData({ amount: '', category: '', date: new Date().toISOString().split('T')[0], icon: '💸' });
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center z-[60] p-0 md:p-4 transition-all">
            {/* Modal Container */}
            <div className={`
                ${darkMode ? "bg-slate-800 border border-slate-700 shadow-2xl" : "bg-white shadow-2xl"} 
                w-full md:max-w-md relative 
                rounded-t-[2.5rem] md:rounded-[2.5rem] 
                p-6 md:p-8 
                max-h-[92vh] overflow-y-auto
                animate-in slide-in-from-bottom md:zoom-in duration-300
            `}>
                
                {/* Close Button - Sticky on mobile for better UX */}
                <button 
                    onClick={onClose} 
                    className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${
                        darkMode ? "bg-slate-900/50 text-slate-500 hover:text-white" : "bg-slate-50 text-slate-400 hover:text-slate-600"
                    }`}
                >
                    <X size={20} />
                </button>

                <h2 className={`text-xl md:text-2xl font-black mb-6 md:mb-8 ${darkMode ? "text-white" : "text-slate-800"}`}>
                    {title}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    <div className="grid grid-cols-4 gap-3">
                        {/* Icon Input - Made smaller to save space */}
                        <div className="col-span-1">
                            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Icon</label>
                            <input 
                                type="text" 
                                className={`w-full p-3 md:p-4 rounded-2xl mt-1 text-center outline-none transition-all text-xl border ${
                                    darkMode ? "bg-slate-900 border-slate-700 text-white focus:border-blue-500" : "bg-slate-50 border-slate-100 focus:ring-2 focus:ring-blue-500"
                                }`}
                                value={formData.icon}
                                onChange={(e) => setFormData({...formData, icon: e.target.value})}
                            />
                        </div>

                        {/* Category Input */}
                        <div className="col-span-3">
                            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Category</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Salary, Food"
                                className={`w-full p-3 md:p-4 rounded-2xl mt-1 outline-none transition-all font-medium text-sm md:text-base border ${
                                    darkMode ? "bg-slate-900 border-slate-700 text-white focus:border-blue-500" : "bg-slate-50 border-slate-100 focus:ring-2 focus:ring-blue-500"
                                }`}
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                            />
                        </div>
                    </div>

                    {/* Amount Input */}
                    <div>
                        <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Amount (INR)</label>
                        <input 
                            type="number" 
                            placeholder="0.00"
                            className={`w-full p-3 md:p-4 rounded-2xl mt-1 outline-none transition-all font-bold text-lg border ${
                                darkMode ? "bg-slate-900 border-slate-700 text-white focus:border-blue-500" : "bg-slate-50 border-slate-100 focus:ring-2 focus:ring-blue-500"
                            }`}
                            value={formData.amount}
                            onChange={(e) => setFormData({...formData, amount: e.target.value === '' ? '' : Number(e.target.value)})}
                        />
                    </div>

                    {/* Date Input */}
                    <div>
                        <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Date</label>
                        <input 
                            type="date" 
                            className={`w-full p-3 md:p-4 rounded-2xl mt-1 outline-none transition-all font-medium text-sm border ${
                                darkMode ? "bg-slate-900 border-slate-700 text-white focus:border-blue-500" : "bg-slate-50 border-slate-100 focus:ring-2 focus:ring-blue-500"
                            }`}
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`w-full py-4 rounded-2xl font-black text-white transition-all shadow-lg flex items-center justify-center gap-2 mt-4 hover:-translate-y-1 active:scale-95 ${
                            type === 'income' ? 'bg-green-600 hover:bg-green-700 shadow-green-900/20' : 'bg-red-500 hover:bg-red-600 shadow-red-900/20'
                        }`}
                    >
                        <Save size={20} /> Save {type === 'income' ? 'Income' : 'Expense'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEntryModal;