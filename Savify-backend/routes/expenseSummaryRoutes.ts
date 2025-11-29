import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getExpenseSummary } from '../controllers/expenseSummaryController.js';

const router = express.Router();

router.get("/summary", verifyToken, getExpenseSummary)

export default router