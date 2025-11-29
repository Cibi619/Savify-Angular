import Expense from '../models/Expense.js'
import { Request, Response} from 'express'
import User from '../models/User.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

// get all expenses for a User
export const getUserExpenses = async (req: AuthRequest, res: Response) => {
  try {
    console.log("Decoded user:", req.user);
    const userId = req.user?.id;
    const expenses = await Expense.find({ user: userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
};
// get expenses for the user for specific month
export const getExpensesByMonth = async (req: AuthRequest, res: Response) => {
  try {
    const { month, year } = req.query;
    if (!month || !year) {
      return res.status(400).json({ message: "Month and year are required" });
    }
    const yr = Number(year);
    const startDate = new Date(`${month} 1, ${yr}`);
    const endDate = new Date(yr, startDate.getMonth() + 1, 0, 23, 59, 59);
    const expenses = await Expense.find({
      user: req.user?.id,
      month: month,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }).sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (err) {
    console.error("Error in getExpensesByMonth:", err);
    res.status(500).json({ message: "Error fetching monthly expenses" });
  }
};

// add a new expense fr the user
export const addExpense = async (req: AuthRequest, res: Response) => {
    try {
        console.log("Decoded user:", req.user);
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: user not found" });
        }
        const { category, name, price, date, month, note } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        const expense = new Expense({
            user: userId,
            category,
            name,
            price,
            date,
            month,
            note
            });

        const savedExpense = await expense.save();
        res.status(201).json({ message: "Expense added successfully", savedExpense });
    } catch(err: any) {
        res.status(400).json({error: err})
    }
}

// update expense for the user
export const updateExpense = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { category, name, price, date, month, note } = req.body;
        const updatedExpense = await Expense.findOneAndUpdate(
            { _id: id, user: req.user?.id },
            { category, name, price, date, month, note },
            { new: true }
        );
        if (!updatedExpense) return res.status(404).json({ message: "Expense not found" });
        res.status(200).json(updatedExpense);
    } catch(err: any) {
        res.status(500).json({ message: "Error updating expense" });
    }
}

// delete expense for the user
export const deleteExpense = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params;
        const deletedExpense = await Expense.findOneAndDelete({
            _id: id,
            user: req.user?.id
        });
        if (!deletedExpense) return res.status(404).json({ message: "Expense not found" });
        res.status(200).json({ message: "Expense deleted successfully" });
        res.status(200).json(deletedExpense)
    } catch(err: any) {
        res.status(500).json({ message: "Error deleting expense" });
    }
}