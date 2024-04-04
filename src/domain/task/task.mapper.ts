import { TaskRequest, TaskResponse } from "./task.dto";
import taskSchema from "./task.schema";

export default class TaskMapper {
    public static toEntity(task: TaskRequest): typeof taskSchema {
        const taskEntity = new taskSchema({
            categoryId: task.categoryId,
            title: task.title,
            description: task.description,
            status: task.status,
            conclusion: task.conclusion,
            type: task.type,
            userId: task.userId
        });
        return taskEntity as unknown as typeof taskSchema;
    }
}