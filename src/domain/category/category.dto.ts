import { UserResponse } from "../user/user.dto";

export interface CategoryResponse {
    id: string,
    user: UserResponse,
    name: string,
    color: string
}

export interface CategoryRequest {
    userId: string,
    name: string,
    color: string
}