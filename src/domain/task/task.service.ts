import { TaskRequest, TaskResponse } from "./task.dto";

export interface TaskService {
    createTask(task: any): Promise<void>;
    getTask(id: string): Promise<TaskResponse>;
    getTasks(): Promise<TaskResponse[]>;
    updateTask(id: string, task: TaskRequest): Promise<void>;
    deleteTask(id: string): Promise<void>;
}