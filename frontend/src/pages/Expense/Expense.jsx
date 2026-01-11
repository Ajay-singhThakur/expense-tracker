import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Layout/Sidebar.jsx';
import TransactionCard from '../../components/Cards/TransactionCard.jsx';
import AddEntryModal from '../../components/Modals/AddEntryModal.jsx';
import API from '../../utils/api.js';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

const Expense = () => {
    const [expenses, setExpenses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchExpenses = async () => {
        try {
            const { data } = await API.get('/expense/get');
            setExpenses(data.expenses);
        } catch (err) { console.error(err); }
    };

    const handleAdd = async (formData) => {
        try {const dataToSend = { ...formData };
        const now = new Date();
        const selectedDate = new Date(formData.date);
        
        selectedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
        dataToSend.date = selectedDate.toISOString();

        await API.post('/income/add', dataToSend);
            await API.post('/expense/add', formData);
            toast.success("Expense added!");
            setIsModalOpen(false);
            fetchExpenses();
        } catch (err) { toast.error("Failed to add expense"); }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/expense/${id}`);
            toast.success("Expense removed");
            fetchExpenses();
        } catch (err) { toast.error("Delete failed"); }
    };

    useEffect(() => { fetchExpenses(); }, []);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-72 p-10">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-black text-slate-800">Expenses</h1>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-600 shadow-lg shadow-red-100">
                        <Plus size={20}/> Add Expense
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {expenses.length > 0 ? (
                        expenses.map(item => <TransactionCard key={item._id} item={item} type="expense" onDelete={handleDelete} />)
                    ) : (
                        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100 italic text-slate-400">No expense entries found.</div>
                    )}
                </div>
            </main>
            <AddEntryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAdd} title="Add Expense" type="expense" />
        </div>
    );
};

export default Expense;