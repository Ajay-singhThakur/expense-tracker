import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Layout/Sidebar.jsx';
import TransactionCard from '../../components/Cards/TransactionCard.jsx';
import AddEntryModal from '../../components/Modals/AddEntryModal.jsx';
import API from '../../utils/api.js';
import toast from 'react-hot-toast';
import { Plus, Wallet } from 'lucide-react';

const Income = () => {
    const [incomes, setIncomes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchIncomes = async () => {
        try {
            const { data } = await API.get('/income/get');
            setIncomes(data.incomes);
        } catch (err) { console.error(err); }
    };

    const handleAdd = async (formData) => {
        try {
            const dataToSend = { ...formData };
        const now = new Date();
        const selectedDate = new Date(formData.date);
        
        selectedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
        dataToSend.date = selectedDate.toISOString();

        await API.post('/income/add', dataToSend);
            await API.post('/income/add', formData);
            toast.success("Income added!");
            setIsModalOpen(false);
            fetchIncomes();
        } catch (err) { toast.error("Failed to add income"); }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/income/${id}`);
            toast.success("Income removed");
            fetchIncomes();
        } catch (err) { toast.error("Delete failed"); }
    };

    useEffect(() => { fetchIncomes(); }, []);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-72 p-10">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-black text-slate-800">Income</h1>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-700 shadow-lg shadow-green-100">
                        <Plus size={20}/> Add Income
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {incomes.length > 0 ? (
                        incomes.map(item => <TransactionCard key={item._id} item={item} type="income" onDelete={handleDelete} />)
                    ) : (
                        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100 italic text-slate-400">No income entries found.</div>
                    )}
                </div>
            </main>
            <AddEntryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAdd} title="Add Income" type="income" />
        </div>
    );
};

export default Income;