import Expense from '../models/Expense.js'
import { Request, Response} from 'express'
import User from '../models/User.js';

// get all expenses for a User
export const getAllExpenses = async (req: Request, res: Response) => {
    try {
        const {user_id} = req.params
        const expenses = await Expense.find({user_id}).populate("user", "name email");
        res.status(200).json(expenses)
    } catch(err: any) {
        res.status(401).json({error: 'Error fetching expenses for the user'})
    }
}

// get expenses for the user for specific month
export const getExpensesByMonth = async (req: Request, res: Response) => {
    try {
        const {id, month} = req.params
        const expenses = await Expense.find({id, month})
        res.status(200).json(expenses)
    } catch(err: any) {
        res.status(401).json({error: 'Error fetching expenses by month for the user'})
    }
}

// add a new expense fr the user
export const addExpense = async (req: Request, res: Response) => {
    try {
        const { user_id, category, name, price, date, month, note } = req.body;
        const user = await User.findById(user_id);
        if (!user) return res.status(404).json({ message: "User not found" });
        const expense = new Expense({
            user: user._id,
            category,
            name,
            price,
            date,
            month,
            note
            });

        const savedExpense = await expense.save();
        res.status(201).json(savedExpense)
    } catch(err: any) {
        res.status(400).json({error: 'Error adding expense'})
    }
}

// update expense for the user
export const updateExpense = async (req: Request, res: Response) => {
    try {
        const id = req.params
        const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedExpense) return res.status(404).json({ message: "Expense not found" });
        res.status(200).json(updatedExpense);
    } catch(err: any) {
        res.status(401).json({error: 'Could not update the expense for the user'})
    }
}

// delete expense for the user
export const deleteExpense = async (req: Request, res: Response) => {
    try {
        const id = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(id)
        if (!deletedExpense) return res.status(404).json({ message: "Expense not found"})
        res.status(200).json(deletedExpense)
    } catch(err: any) {
        res.status(401).json({error: 'Could not delete the expense'})
    }
}