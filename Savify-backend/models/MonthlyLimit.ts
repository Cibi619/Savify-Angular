import mongoose from "mongoose";
import User from "./User.js";

const monthlyLimitSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: User, required: true},
    category: {type: String, enum: ["Groceries", "Travel", "Entertainment", "Miscellaneous"]},
    month: {type: String, required: true},
    year: {type: Number, required: true},
    limit: {type: Number, required: true}
});

monthlyLimitSchema.index(
  { user: 1, category: 1, month: 1, year: 1 },
  { unique: true }
);

export default mongoose.model("MonthlyLimit", monthlyLimitSchema)
