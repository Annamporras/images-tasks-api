import { Task } from "../core/Task";
import { v4 as uuidv4 } from "uuid";
import { TaskRepository } from "../core/TaskRepository";
import { processImage } from "../infra/imageProcessor";

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

    processImage(originalPath)
        .then(async (images) => {
            task.status = "completed";
            task.images = images;
            task.updatedAt = new Date();

            await repository.update(task);

        })
        .catch(async () => {

            task.status = "failed";
            task.updatedAt = new Date();

            await repository.update(task);

        });
    return task
}