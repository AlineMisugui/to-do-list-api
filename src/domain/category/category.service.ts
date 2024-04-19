import { CategoryRequest, CategoryResponse } from "./category.dto";

export interface CategoryService {
    createCategory(category: any, userId: string): Promise<void>;
    getCategory(id: string, userId: string|null): Promise<CategoryResponse>;
    getCategories(): Promise<CategoryResponse[]>;
    getCategoriesByUser(userId: string): Promise<CategoryResponse[]>;
    updateCategory(id: string, category: CategoryRequest, userId: string): Promise<CategoryResponse>;
    deleteCategory(id: string, userId: string): Promise<void>;
}