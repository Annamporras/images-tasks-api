import { TaskRepository } from "../core/TaskRepository";
import { Task, TaskStatus } from "../core/Task";
import { TaskModel } from "./db/schema";

export class MongoTaskRepository implements TaskRepository {

    async save(task: Task): Promise<void> {

        await TaskModel.create({
            _id: task.id,
            status: task.status,
            price: task.price,
            originalPath: task.originalPath,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt
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
            images: task.images?.map(img => ({
                resolution: img.resolution as number,
                path: img.path as string,
            })),
            createdAt: task.createdAt,
            updatedAt: task.updatedAt
        };

    }
    async update(task: Task): Promise<void> {
        await TaskModel.updateOne(
            { _id: task.id },
            {
                status: task.status,
                images: task.images,
                updatedAt: new Date()
            }
        );
    }

}