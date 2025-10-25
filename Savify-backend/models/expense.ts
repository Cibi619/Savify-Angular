import mongoose from "mongoose"

const expenseSchema = new mongoose.Schema({
    user_name: { type: String, required: true},
    user_id: { type: String, required: true},
    category: {
        type: String,
        required: true,
        enum: ['Groceries', 'Travel', 'Entertainment', 'Miscellaneous']
    },
    name: { type: String, required: true},
    price: { type: Number, required: true},
    date: { type: Date, required: true},
    month: { type: String, required: true},
    note: { type: String}
})

export default mongoose.model('Expense', expenseSchema);