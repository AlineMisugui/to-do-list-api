import { CategoryResponse } from "../category/category.dto"
import { UserResponse } from "../user/user.dto"

export interface TaskRequest {
    title: string, 
    description: string, 
    conclusion?: Date | null,
    type: string,
    categoryId: string,
    status: string,
    userId?: string
}

export interface TaskResponse {
    id: string,
    title: string, 
    description: string, 
    conclusion: Date,
    type: string,
    category: CategoryResponse,
    status: ["PENDING", "IN_COURSE", "FINALIZED"],
    user: UserResponse
}