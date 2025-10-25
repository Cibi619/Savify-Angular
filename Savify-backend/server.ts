import express from 'express'
import mongoose from "mongoose"
import * as dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import userRoutes from "./routes/userRoutes.js"
import expenseRoutes from './routes/expenseRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use("/api/expenses", expenseRoutes);
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

