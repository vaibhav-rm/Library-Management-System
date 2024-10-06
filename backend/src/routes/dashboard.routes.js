import { Router } from "express";
import { getDashboardStats, getBorrowingTrends } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/stats", getDashboardStats);
router.get("/borrowing-trends", getBorrowingTrends);

export default router;