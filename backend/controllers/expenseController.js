const Expense = require("../models/Expense");

// Add a new expense
exports.addExpense = async (req, res) => {
  try {
    const { icon, category, amount, date } = req.body;

    // req.user is populated by our authMiddleware
    const expense = new Expense({
      userId: req.user,
      icon,
      category,
      amount,
      date,
    });

    await expense.save();
    res.status(201).json({ success: true, expense });
  } catch (err) {
    res.status(500).json({ message: "Server Error: Could not add expense" });
  }
};

// Get all expenses for the logged-in user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user }).sort({
      date: -1,
    });
    res.status(200).json({ success: true, expenses });
  } catch (err) {
    res.status(500).json({ message: "Server Error: Could not fetch expenses" });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error: Could not delete expense" });
  }
};
exports.updateIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, category, date, icon } = req.body;
        
        // Find by ID and update with new data from form
        const updatedIncome = await Income.findByIdAndUpdate(
            id, 
            { amount, category, date, icon },
            { new: true } 
        );
        
        res.status(200).json({ message: "Update Successful", updatedIncome });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
