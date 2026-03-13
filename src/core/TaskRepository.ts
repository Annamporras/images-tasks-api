import { Task } from "./Task";

export interface TaskRepository {
    save(task: Task): Promise<void>;
    findById(taskId: string): Promise<Task | null>;
}