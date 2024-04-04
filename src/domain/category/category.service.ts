import { CategoryRequest, CategoryResponse } from "./category.dto";

export interface CategoryService {
    createCategory(category: any): Promise<void>;
    getCategory(id: string): Promise<CategoryResponse>;
    getCategories(): Promise<CategoryResponse[]>;
    updateCategory(id: string, category: CategoryRequest): Promise<CategoryResponse>;
    deleteCategory(id: string): Promise<void>;
}