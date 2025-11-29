import Expense from "../models/Expense.js";
import MonthlyLimit from "../models/MonthlyLimit.js";

export const getExpenseSummary = async (req: any, res: any) => {
    try {
        const {month, year} = req.query;
        if (!month || !year) {
            return res.status(400).json({message: "Month and year are required"});
        }
        const userId = req.user.id;
        const limits = await MonthlyLimit.find({
            user: userId,
            month: month,
            year: Number(year)
        });
        const expenses = await Expense.find({
            user: userId,
            month: month
        });
        const categories = ["Groceries", "Travel", "Entertainment", "Miscellaneous"];

        const summary = categories.map(cat => {
            const limitEntry = limits.find(l => l.category === cat);

            const spent = expenses
                .filter(e => e.category === cat)
                .reduce((sum, e) => sum + e.price, 0);

            return {
                category: cat,
                limit: limitEntry?.limit || 0,
                spent,
                remaining: (limitEntry?.limit || 0) - spent
            };
        });

        return res.status(200).json(summary);
    } catch (err: any) {
        console.error("Error building summary:", err);
        return res.status(500).json({ error: err.message });
    }
}