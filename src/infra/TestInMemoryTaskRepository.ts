import { Task } from "../core/Task";
import { TaskRepository } from "../core/TaskRepository";

export class TestInMemoryTaskRepository implements TaskRepository {

    private tasks: Map<string, Task> = new Map();

    async save(task: Task): Promise<void> {
        this.tasks.set(task.id, task);
    }

    async findById(taskId: string): Promise<Task | null> {
        return this.tasks.get(taskId) || null;
    }
    async update(task: Task): Promise<void> {
        this.tasks.set(task.id, task);

    }

}