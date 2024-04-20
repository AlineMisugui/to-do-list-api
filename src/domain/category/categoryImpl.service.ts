import { ForbiddenException } from "../../exceptions/forbiddenException";
import { BadRequestException } from "../../exceptions/badRequestException";
import { NotFoundException } from "../../exceptions/notFoundException";
import UserMapper from "../user/user.mapper";
import { UserService } from "../user/user.service";
import UserServiceImpl from "../user/userImpl.service";
import { CategoryRequest, CategoryResponse } from "./category.dto";
import CategoryMapper from "./category.mapper";
import categoryRepository from "./category.schema";
import { CategoryService } from "./category.service";

class CategoryServiceImpl implements CategoryService {

    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async createCategory(category: CategoryRequest, userId: string): Promise<void> {
        category.userId = userId;
        const newCategory = CategoryMapper.toEntity(category);
        await categoryRepository.create(newCategory);
    }

    async getCategory(id: string, userId: string | null): Promise<CategoryResponse> {
        const category = await categoryRepository.findById(id);

        if (!category) {
            throw new NotFoundException("Category not found.");
        }
        if (userId && category?.userId?.toString() !== userId.toString()) {
            throw new ForbiddenException("User not allowed to access this category.");
        }

        const user = await this.userService.getUser(category.userId ?? "")
        const categoryResponse: CategoryResponse = {
            id: category.id,
            name: category.name ?? "",
            color: category.color ?? "",
            user: UserMapper.toResponse(user)
        }
        return categoryResponse as unknown as CategoryResponse;
    }

    async getCategories(): Promise<CategoryResponse[]> {
        const categories = await categoryRepository.find();
        var allCategories: CategoryResponse[] = await Promise.all(categories.map(async category => {
            const user = await this.userService.getUser(category.userId ?? "")
            const categoryResponse: CategoryResponse = {
                id: category.id,
                name: category.name ?? "",
                color: category.color ?? "",
                user: UserMapper.toResponse(user)
            }
            return categoryResponse;
        }));
        return allCategories as unknown as Promise<CategoryResponse[]>;
    }

    async getCategoriesByUser(userId: string): Promise<CategoryResponse[]> {
        const categories = await categoryRepository.find({ userId: userId });

        var allCategories: CategoryResponse[] = await Promise.all(categories.map(async category => {
            const user = await this.userService.getUser(category.userId ?? "")
            const categoryResponse: CategoryResponse = {
                id: category.id,
                name: category.name ?? "",
                color: category.color ?? "",
                user: UserMapper.toResponse(user)
            }
            return categoryResponse;
        }));
        return allCategories as unknown as Promise<CategoryResponse[]>;
    } 

    async updateCategory(id: string, category: CategoryRequest, userId: string): Promise<CategoryResponse> {
        await this.getCategory(id, userId);
        category.userId = userId;
        const updatedCategory = await categoryRepository.findByIdAndUpdate(id, category);
        return CategoryMapper.toResponse(updatedCategory);
    }

    async deleteCategory(id: string, userId: string): Promise<void> {
        await this.getCategory(id, userId);
        await categoryRepository.findByIdAndDelete(id);
    }
}

const userService = UserServiceImpl;
export default new CategoryServiceImpl(userService);