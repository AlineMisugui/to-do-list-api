import { TaskRequest, TaskResponse } from "./task.dto";

export interface TaskService {
    createTask(task: any, userId: string): Promise<void>;
    getTask(id: string, userId: string): Promise<TaskResponse>;
    getTasksByUser(userId: string): Promise<TaskResponse[]>;
    getTasks(): Promise<TaskResponse[]>;
    updateTask(id: string, task: TaskRequest, userId: string): Promise<void>;
    deleteTask(id: string, userId: string): Promise<void>;
}