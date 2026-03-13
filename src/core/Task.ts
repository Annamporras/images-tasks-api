export type TaskStatus = "pending" | "completed" | "failed";

export interface ImageSize {
    resolution: number;
    path: string;
}

export interface Task {
    id: string;
    status: TaskStatus;
    price: number;
    originalPath: string;
    images?: ImageSize[];
    createdAt: Date;
    updatedAt: Date;
}