import { BadRequestException } from "../../exceptions/badRequestException";
import { TaskRequest, TaskResponse } from "./task.dto";
import TaskMapper from "./task.mapper";
import { TaskService } from "./task.service";
import taskRepository from "./task.schema";
import categoryImplService from "../category/categoryImpl.service";
import userImplService from "../user/userImpl.service";
import CategoryMapper from "../category/category.mapper";
import UserMapper from "../user/user.mapper";

class TaskServiceImpl implements TaskService {
    async createTask(task: TaskRequest): Promise<void> {
        if (!task) {
            throw new BadRequestException("Task is required.");
        }
        const newTask = TaskMapper.toEntity(task);
        await taskRepository.create(newTask);
    }

    async getTask(id: string): Promise<TaskResponse> {
        const task = await taskRepository.findById(id);
        if (!task) {
            throw new BadRequestException("Task not found.");
        }
        const category = await categoryService.getCategory(task.categoryId ?? '');
        const user = await userService.getUser(task.userId ?? '');
        const taskResponse : TaskResponse = {
            id: task.id,
            category: CategoryMapper.toResponse(category),
            title: task.title ?? '',
            description: task.description ?? '',
            conclusion: task.conclusion ? new Date(task.conclusion) : '' as any,
            type: task.type ?? '',
            status: task.status as ["PENDING", "IN_COURSE", "FINALIZED"],
            user: UserMapper.toResponse(user)
        }
        return taskResponse as unknown as TaskResponse;
    }

    async getTasks(): Promise<TaskResponse[]> {
        const tasks = await taskRepository.find();
        const allTasks: TaskResponse[] = await Promise.all(tasks.map(async task => {
            const category = await categoryService.getCategory(task.categoryId ?? '');
            const user = await userService.getUser(task.userId ?? '');
            const taskResponse : TaskResponse = {
                id: task.id,
                category: CategoryMapper.toResponse(category),
                title: task.title ?? '',
                description: task.description ?? '',
                conclusion: task.conclusion ? new Date(task.conclusion) : '' as any,
                type: task.type ?? '',
                status: task.status as ["PENDING", "IN_COURSE", "FINALIZED"],
                user: UserMapper.toResponse(user)
            }
            return taskResponse;
        }));
        return allTasks as unknown as TaskResponse[];
    }

    async updateTask(id: string, task: TaskRequest): Promise<void> {
        this.getTask(id);
        const updatedTask = TaskMapper.toEntity(task);
        await taskRepository.findByIdAndUpdate(id, updatedTask);
    }

    async deleteTask(id: string): Promise<void> {
        this.getTask(id);
        await taskRepository.findByIdAndDelete(id);
    }
}

const categoryService = categoryImplService
const userService = userImplService
export default new TaskServiceImpl()