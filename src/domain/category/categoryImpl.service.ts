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

    async createCategory(category: CategoryRequest): Promise<void> {
        if (!category) {
            throw new BadRequestException("Category is required.");
        }
        await categoryRepository.create(category);
    }

    async getCategory(id: string): Promise<CategoryResponse> {
        const category = await categoryRepository.findById(id);
        if (!category) {
            throw new NotFoundException("Category not found.");
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

    async updateCategory(id: string, category: CategoryRequest): Promise<CategoryResponse> {
        this.getCategory(id);
        const updatedCategory = CategoryMapper.toEntity(category);
        await categoryRepository.findByIdAndUpdate(id, updatedCategory);
        return updatedCategory as unknown as CategoryResponse;
    }

    async deleteCategory(id: string): Promise<void> {
        this.getCategory(id);
        await categoryRepository.findByIdAndDelete(id);
    }
}

const userService = UserServiceImpl;
export default new CategoryServiceImpl(userService);