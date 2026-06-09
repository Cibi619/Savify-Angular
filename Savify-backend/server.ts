import express from 'express'
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"
import userRoutes from "./routes/userRoutes.js"
import expenseRoutes from './routes/expenseRoutes.js'
import monthlyLimitRoutes from './routes/monthlyLimitRoutes.js'
import expenseSummaryRoutes from './routes/expenseSummaryRoutes.js'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use((req, res, next) => {
  if (req.method === 'GET') return next();
  express.json()(req, res, next);
});

app.use('/api/users', userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/monthly-limits", monthlyLimitRoutes)
app.use("/api/monthly-categories", expenseSummaryRoutes)
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || '').then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Basic route
app.get('/', (req, res) => {
  res.send('Express backend is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

