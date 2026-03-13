import { TaskRepository } from "../core/TaskRepository";
import { Task } from "../core/Task";

export async function getTask(
    taskId: string,
    repository: TaskRepository
): Promise<Task | null> {

    return repository.findById(taskId);

}