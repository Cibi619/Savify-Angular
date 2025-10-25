import express from 'express'
import { get } from "mongoose";
import { getAllExpenses, getExpensesByMonth, addExpense, updateExpense, deleteExpense } from "../controllers/expenseController.js"

const router = express.Router();

router.get('/:user_id', getAllExpenses)
router.get('/:user_id/month', getExpensesByMonth)
router.post('/', addExpense)
router.put('/:id', updateExpense)
router.delete('/:id', deleteExpense)

export default router;