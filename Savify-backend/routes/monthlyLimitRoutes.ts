import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getMonthlyLimits, updateMonthlyLimit } from "../controllers/monthlyLimitController.js";

const router = express.Router();

router.get("/", authMiddleware, getMonthlyLimits);
router.post("/", authMiddleware, updateMonthlyLimit);

export default router;