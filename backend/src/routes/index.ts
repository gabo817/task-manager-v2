import { Router } from "express";
import authRoutes from "./auth.routes";
import taskRoutes from "./task.routes";
import healtRoutes from "./health.routes";

const router = Router();

router.use("/",healtRoutes)
router.use("/", authRoutes);
router.use("/tasks", taskRoutes);

export default router;