import { Router } from "express";
import { HealthController } from "../controllers/health.controller";

const router = Router();

router.get("/health", HealthController.health);

export default router;