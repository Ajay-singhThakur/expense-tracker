import React from 'react';
import { Trash2, Calendar } from 'lucide-react';
import { formatCurrency } from '../../utils/helper.js';

const TransactionCard = ({ item, type, onDelete }) => (
    <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-50 flex items-center justify-between hover:shadow-md transition-shadow group">
        <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl">{item.icon}</div>
            <div>
                <h4 className="font-bold text-slate-800 text-lg">{item.category}</h4>
                <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                    <Calendar size={14} /> {new Date(item.date).toLocaleDateString()}
                </div>
            </div>
        </div>
        <div className="flex items-center gap-6">
            <span className={`text-xl font-black ${type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                {type === 'income' ? '+' : '-'}{formatCurrency(item.amount)}
            </span>
            <button onClick={() => onDelete(item._id)} className="p-2 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                <Trash2 size={20} />
            </button>
        </div>
        
    </div>
);

export default TransactionCard;