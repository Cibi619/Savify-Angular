import MonthlyLimit from "../models/MonthlyLimit.js"

export const updateMonthlyLimit = async (req: any, res: any) => {
    try {
        const { user, category, month, year, limit} = req.body
        const updated = await MonthlyLimit.findOneAndUpdate(
            {user, category, month, year},
            {limit},
            {new: true, upsert: true}
        );
        res.json({
            message: "Monthly limit updated!",
            limit: updated
        });
    } catch(err: any) {
        res.status(500).json({ error: err.message });
    }
}

export const getMonthlyLimits = async (req: any, res: any) => {
    try {
        const {user, month, year} = req.query;
        const limits = await MonthlyLimit.find({ user, month, year });
        res.json(limits);
    } catch(err: any) {
        res.status(500).json({error: err.message});
    }
}