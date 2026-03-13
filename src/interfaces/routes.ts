import { Router } from "express";
import { createTaskHandler, getTaskHandler } from "./controller";

const router = Router();

router.post("/tasks", createTaskHandler);
router.get("/tasks/:taskId", getTaskHandler);

export default router;