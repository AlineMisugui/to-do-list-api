import BaseController from "../../senior/BaseController";
import { TaskService } from "./task.service";
import { Request, Response } from "express";
import TaskServiceImpl from "./taskImpl.service";

class TaskController extends BaseController {
    private taskService: TaskService

    constructor(taskService: TaskService) {
        super()
        this.taskService = taskService
    }

    createTask = this.executeAction(async (req: Request, res: Response) => {
        const task = await this.taskService.createTask(req.body);
        res.status(201).send({ message: 'Task created successfully' });
    });

    getTask = this.executeAction(async (req: Request, res: Response) => {
        const task = await this.taskService.getTask(req.params.id);
        res.status(200).send(task)
    });

    getTasks = this.executeAction(async (req: Request, res: Response) => {
        const tasks = await this.taskService.getTasks();
        res.status(200).send(tasks)
    });

    updateTask = this.executeAction(async (req: Request, res: Response) => {
        const task = await this.taskService.updateTask(req.params.id, req.body);
        res.status(200).send(task)
    });

    deleteTask = this.executeAction(async (req: Request, res: Response) => {
        await this.taskService.deleteTask(req.params.id);
        res.status(200).send({ message: 'Task deleted successfully' });
    });
}

const taskService = TaskServiceImpl
export default new TaskController(taskService)