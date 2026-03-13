import { TaskRepository } from "../core/TaskRepository";
import { Task, TaskStatus } from "../core/Task";
import { TaskModel } from "./db/schema";

export class MongoTaskRepository implements TaskRepository {

    async save(task: Task): Promise<void> {

        await TaskModel.create({
            _id: task.id,
            status: task.status,
            price: task.price,
            originalPath: task.originalPath
        });

    }

    async findById(taskId: string): Promise<Task | null> {

        const task = await TaskModel.findById(taskId);

        if (!task) return null;

        return {
            id: task.id,
            status: task.status as TaskStatus,
            price: task.price,
            originalPath: task.originalPath,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt
        };

    }

}