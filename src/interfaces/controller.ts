import { Request, Response } from "express";
import { createTask } from "../application/createTask";
import { MongoTaskRepository } from "../infra/MongoTaskRepository";
import { getTask } from "../application/getTask";


const repository = new MongoTaskRepository();

export async function createTaskHandler(req: Request, res: Response) {
    const { imagePath } = req.body;

    if (!imagePath) {
        return res.status(400).json({ error: "imagePath is required" });
    }

    const task = await createTask(imagePath, repository);

    return res.status(201).json({
        taskId: task.id,
        status: task.status,
        price: task.price,
    });
}

export async function getTaskHandler(req: Request, res: Response) {

    const { taskId } = req.params;

    if (!taskId || typeof taskId !== "string") {
        return res.status(400).json({ error: "Invalid taskId" });
    }

    const task = await getTask(taskId, repository);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    return res.json(task);

}