import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

const AddEntryModal = ({ isOpen, onClose, onAdd, title, type }) => {
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
        // Reset form
        setFormData({ amount: '', category: '', date: new Date().toISOString().split('T')[0], icon: '💸' });
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
                <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-black mb-8 text-slate-800">{title}</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm font-bold text-slate-500 ml-1 uppercase tracking-wider">Icon (Emoji)</label>
                        <input 
                            type="text" 
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none text-2xl"
                            value={formData.icon}
                            onChange={(e) => setFormData({...formData, icon: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-500 ml-1 uppercase tracking-wider">Category</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Freelancing, Food"
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-500 ml-1 uppercase tracking-wider">Amount (INR)</label>
                        <input 
                            type="number" 
                            placeholder="0.00"
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                            value={formData.amount}
                            onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-500 ml-1 uppercase tracking-wider">Date</label>
                        <input 
                            type="date" 
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`w-full py-4 rounded-2xl font-black text-white transition-all shadow-lg flex items-center justify-center gap-2 mt-4 ${
                            type === 'income' 
                            ? 'bg-green-600 hover:bg-green-700 shadow-green-100' 
                            : 'bg-red-500 hover:bg-red-600 shadow-red-100'
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