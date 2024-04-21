import { TaskResponse } from "../task/task.dto";
import { UserResponse } from "../user/user.dto";

export interface CategoryResponse {
    id: string,
    user: UserResponse,
    name: string,
    color: string
}

export interface CategoryTasksResponse {
    id: string,
    user: UserResponse,
    name: string,
    color: string,
    tasks: TaskResponse[]
}

export interface CategoryRequest {
    userId: string,
    name: string,
    color: string
}