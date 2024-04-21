import { BadRequestException } from "../../exceptions/badRequestException";
import { TaskRequest, TaskResponse } from "./task.dto";
import TaskMapper from "./task.mapper";
import { TaskService } from "./task.service";
import taskRepository from "./task.schema";
import categoryImplService from "../category/categoryImpl.service";
import userImplService from "../user/userImpl.service";
import CategoryMapper from "../category/category.mapper";
import UserMapper from "../user/user.mapper";
import { ForbiddenException } from "../../exceptions/forbiddenException";
import { NotFoundException } from "../../exceptions/notFoundException";
import { CategoryTasksResponse } from "../category/category.dto";

class TaskServiceImpl implements TaskService {
    async verifyCategory(categoryId: string, userId: string): Promise<void> {
        const category = await categoryImplService.getCategory(categoryId, userId);
        if (!category) {
            throw new BadRequestException("Category not found.");
        }
    }

    async getTasksByCategory(categoryId: string, userId: string): Promise<TaskResponse[]> {
        await this.verifyCategory(categoryId, userId);
        const tasks = await taskRepository.find({ categoryId: categoryId });
        const allTasks: TaskResponse[] = await Promise.all(tasks.map(async task => {
            const category = await categoryService.getCategory(task.categoryId ?? '', userId);
            const user = await userService.getUser(task.userId ?? '');
            const taskResponse: TaskResponse = {
                id: task.id,
                category: CategoryMapper.toResponse(category),
                title: task.title ?? '',
                description: task.description ?? '',
                conclusion: task.conclusion ? new Date(task.conclusion) : '' as any,
                type: task.type ?? '',
                status: task.status ?? '',
                user: UserMapper.toResponse(user)
            };
            return taskResponse;
        }));
        return allTasks as unknown as TaskResponse[];
    }

    async getConcludedTasks(userId: string): Promise<TaskResponse[]> {
        const tasks = await taskRepository.find({ userId: userId, status: "FINALIZED" });
        const allTasks: TaskResponse[] = await this.mapTasksToResponses(tasks, userId);
        return allTasks as unknown as TaskResponse[];
    }

    async mapTasksToResponses(tasks: any, userId: string): Promise<TaskResponse[]> {
        const allTasks: TaskResponse[] = await Promise.all(tasks.map(async (task: any) => {
            const category = await categoryService.getCategory(task.categoryId ?? '', userId);
            const user = await userService.getUser(task.userId ?? '');
            const taskResponse: TaskResponse = {
                id: task.id,
                category: CategoryMapper.toResponse(category),
                title: task.title ?? '',
                description: task.description ?? '',
                conclusion: task.conclusion ? new Date(task.conclusion) : '' as any,
                type: task.type ?? '',
                status: task.status ?? '',
                user: UserMapper.toResponse(user)
            };
            return taskResponse;
        }));
    
        return allTasks;
    }

    async getPendingTasks(userId: string): Promise<TaskResponse[]> {
        const tasks = await taskRepository.find({ userId: userId, status: "PENDING" });
        const allTasks: TaskResponse[] = await Promise.all(tasks.map(async task => {
            const category = await categoryService.getCategory(task.categoryId ?? '', userId);
            const user = await userService.getUser(task.userId ?? '');
            const taskResponse: TaskResponse = {
                id: task.id,
                category: CategoryMapper.toResponse(category),
                title: task.title ?? '',
                description: task.description ?? '',
                conclusion: task.conclusion ? new Date(task.conclusion) : '' as any,
                type: task.type ?? '',
                status: task.status ?? '',
                user: UserMapper.toResponse(user)
            };
            return taskResponse;
        }));
        return allTasks as unknown as TaskResponse[];
    }

    async countTasks(userId: string): Promise<number> {
        return await taskRepository.countDocuments({ userId: userId });
    }

    async getOlderTask(userId: string): Promise<TaskResponse[]> {
        const tasks = await taskRepository.find({ userId: userId }).sort({ createdAt: 1 }).limit(1);
        const allTasks: TaskResponse[] = await this.mapTasksToResponses(tasks, userId);
        return allTasks as unknown as TaskResponse[];
    }

    async getNewerTask(userId: string): Promise<TaskResponse[]> {
        const tasks = await taskRepository.find({ userId: userId }).sort({ createdAt: -1 }).limit(1);
        const allTasks: TaskResponse[] = await this.mapTasksToResponses(tasks, userId);
        return allTasks as unknown as TaskResponse[];
    }

    async getAverageTasksFinalized(userId: string): Promise<string> {
        const tasks = await taskRepository.find({ userId: userId });
        const totalTasks = tasks.length;
        const totalConcluded = tasks.filter((task: any) => task.status == "FINALIZED").length;
        const average = totalConcluded / totalTasks;
        const percentage = average * 100;
        return `${percentage.toFixed(2)}%`;
    }

    async getTaskWithLongerDescription(userId: string): Promise<TaskResponse> {
        const tasks = await taskRepository.find({ userId: userId });
        const task = tasks.reduce((prev: any, current: any) => {
            return prev.description.length > current.description.length ? prev : current;
        });
        const category = await categoryService.getCategory(task.categoryId ?? '', userId);
        const user = await userService.getUser(task.userId ?? '');
        const taskResponse: TaskResponse = {
            id: task.id,
            category: CategoryMapper.toResponse(category),
            title: task.title ?? '',
            description: task.description ?? '',
            conclusion: task.conclusion ? new Date(task.conclusion) : '' as any,
            type: task.type ?? '',
            status: task.status ?? '',
            user: UserMapper.toResponse(user)
        };
        return taskResponse;
    }

    async getTasksGroupedByCategory(userId: string): Promise<any> {
        const tasks = await taskRepository.find({ userId: userId });
        const allTasks: TaskResponse[] = await this.mapTasksToResponses(tasks, userId);
        const tasksGrouped = allTasks.reduce((acc: any, task: TaskResponse) => {
            const categoryTasks: CategoryTasksResponse = {
                id: task.category.id,
                user: task.category.user,
                name: task.category.name,
                color: task.category.color,
                tasks: []
            };

            categoryTasks.tasks.push(task);

            if (acc[task.category.id]) {
                acc[task.category.id].tasks.push(task);
            } else {
                acc[task.category.id] = categoryTasks;
            }
            return acc;
        }, {});
        return tasksGrouped;
    }

    async createTask(task: TaskRequest, userId: string): Promise<void> {
        await this.verifyCategory(task.categoryId, userId);
        task.userId = userId;
        const newTask = TaskMapper.toEntity(task);
        await taskRepository.create(newTask);
    }

    async getTask(id: string, userId: string): Promise<TaskResponse> {
        const task = await taskRepository.findById(id);
        if (!task) {
            throw new NotFoundException("Task not found.");
        }
        if (userId.toString() !== task.userId?.toString()) {
            throw new ForbiddenException("User not allowed to access this task.");
        }
        const category = await categoryService.getCategory(task.categoryId ?? '', userId);
        const user = await userService.getUser(task.userId ?? '');
        const taskResponse : TaskResponse = {
            id: task.id,
            category: CategoryMapper.toResponse(category),
            title: task.title ?? '',
            description: task.description ?? '',
            conclusion: task.conclusion ? new Date(task.conclusion) : '' as any,
            type: task.type ?? '',
            status: task.status ?? '',
            user: UserMapper.toResponse(user)
        }
        return taskResponse as unknown as TaskResponse;
    }

    async getTasks(): Promise<TaskResponse[]> {
        const tasks = await taskRepository.find();
        const allTasks: TaskResponse[] = await this.mapTasksToResponses(tasks, '');
        return allTasks as unknown as TaskResponse[];
    }

    async getTasksByUser(id: string): Promise<TaskResponse[]> {
        const tasks = await taskRepository.find({ userId : id });
        const allTasks: TaskResponse[] = await this.mapTasksToResponses(tasks, id);
        return allTasks as unknown as TaskResponse[];
    }

    async updateTask(id: string, task: TaskRequest, userId: string): Promise<void> {
        await this.verifyCategory(task.categoryId, userId);
        await this.getTask(id, userId);
        await taskRepository.findByIdAndUpdate(id, task);
    }

    async deleteTask(id: string, userId: string): Promise<void> {
        await this.getTask(id, userId);
        await taskRepository.findByIdAndDelete(id);
    }
}

const categoryService = categoryImplService
const userService = userImplService
export default new TaskServiceImpl()