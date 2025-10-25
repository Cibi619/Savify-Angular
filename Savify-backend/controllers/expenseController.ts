import Expense from '../models/Expense.js'
import { Request, Response} from 'express'

// get all expenses for a User
export const getAllExpenses = async (req: Request, res: Response) => {
    try {
        const {user_id} = req.params
        const expenses = await Expense.find({user_id})
        res.status(200).json(expenses)
    } catch(err: any) {
        res.status(401).json({error: 'Error fetching expenses for the user'})
    }
}

// get expenses for the user for specific month
export const getExpensesByMonth = async (req: Request, res: Response) => {
    try {
        const {user_id, month} = req.params
        const expenses = await Expense.find({user_id, month})
        res.status(200).json(expenses)
    } catch(err: any) {
        res.status(401).json({error: 'Error fetching expenses by month for the user'})
    }
}

// add a new expense fr the user
export const addExpense = async (req: Request, res: Response) => {
    try {
        const expense = new Expense(req.body)
        const savedExpense = await expense.save()
        res.status(201).json(savedExpense)
    } catch(err: any) {
        res.status(400).json({error: 'Error adding expense'})
    }
}

// update expense for the user
export const updateExpense = async (req: Request, res: Response) => {
    try {
        const user_id = req.params
        const updatedExpense = await Expense.findByIdAndUpdate(user_id, req.body, { new: true });
        if (!updatedExpense) return res.status(404).json({ message: "Expense not found" });
        res.status(200).json(updatedExpense);
    } catch(err: any) {
        res.status(401).json({error: 'Could not update the expense for the user'})
    }
}

// delete expense for the user
export const deleteExpense = async (req: Request, res: Response) => {
    try {
        const user_id = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(user_id)
        if (!deletedExpense) return res.status(404).json({ message: "Expense not found"})
        res.status(200).json(deletedExpense)
    } catch(err: any) {
        res.status(401).json({error: 'Could not delete the expense'})
    }
}