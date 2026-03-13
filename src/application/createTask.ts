import { Task } from "../core/Task";
import { v4 as uuidv4 } from "uuid";
import { TaskRepository } from "../core/TaskRepository";

export async function createTask(
    originalPath: string,
    repository: TaskRepository
): Promise<Task> {

    const price = Math.floor(Math.random() * 46) + 5;

    const task: Task = {
        id: uuidv4(),
        status: "pending",
        price,
        originalPath,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    await repository.save(task)
    return task
}