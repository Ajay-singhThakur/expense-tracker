const Income = require('../models/Income');

exports.addIncome = async (req, res) => {
    try {
        const { icon, category, amount, date } = req.body;
        const income = new Income({ userId: req.user, icon, category, amount, date });
        await income.save();
        res.status(201).json({ success: true, income });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find({ userId: req.user }).sort({ date: -1 });
        res.json({ success: true, incomes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Income deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};