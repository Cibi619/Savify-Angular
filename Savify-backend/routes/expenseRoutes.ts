import express from 'express'
import { get } from "mongoose";
import { getUserExpenses, getExpensesByMonth, addExpense, updateExpense, deleteExpense } from "../controllers/expenseController.js";
import {verifyToken} from "../middleware/authMiddleware.js"

const router = express.Router();

router.get('/', verifyToken, getUserExpenses)
router.get('/:user_id/month', verifyToken, getExpensesByMonth)
router.post('/', verifyToken, addExpense)
router.put('/:id', verifyToken, updateExpense)
router.delete('/:id', verifyToken, deleteExpense)

export default router;