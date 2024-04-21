import { TaskRequest, TaskResponse } from "./task.dto";

export interface TaskService {
    createTask(task: any, userId: string): Promise<void>;
    getTask(id: string, userId: string): Promise<TaskResponse>;
    getTasksByUser(userId: string): Promise<TaskResponse[]>;
    getTasks(): Promise<TaskResponse[]>;
    updateTask(id: string, task: TaskRequest, userId: string): Promise<void>;
    deleteTask(id: string, userId: string): Promise<void>;

    getTasksByCategory(categoryId: string, userId: string): Promise<TaskResponse[]>;
    getConcludedTasks(userId: string): Promise<TaskResponse[]>;
    getPendingTasks(userId: string): Promise<TaskResponse[]>;
    countTasks(userId: string): Promise<number>;
    getNewerTask(userId: string): Promise<TaskResponse[]>;
    getOlderTask(userId: string): Promise<TaskResponse[]>;

    getAverageTasksFinalized(userId: string): Promise<string>;
    getTaskWithLongerDescription(userId: string): Promise<TaskResponse>;
    getTasksGroupedByCategory(userId: string): Promise<any>;
}