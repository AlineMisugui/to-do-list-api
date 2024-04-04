import { CategoryRequest, CategoryResponse } from "./category.dto"
import categorySchema from "./category.schema"

export default class CategoryMapper {

    public static toEntity(category: CategoryRequest): typeof categorySchema {
        const categoryEntity = new categorySchema({
            user: category.userId,
            name: category.name,
            color: category.color
        });
        return categoryEntity as unknown as typeof categorySchema;
    }   

    public static toResponse(record: any): CategoryResponse {
        const categoryResponse: CategoryResponse = {
            id: record._id,
            user: record.user,
            name: record.name,
            color: record.color
        }
        return categoryResponse;
    }

}