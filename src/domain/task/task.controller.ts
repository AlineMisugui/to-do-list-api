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
        await this.taskService.createTask(req.body, req.user.id);
        res.status(201).send({ message: 'Task created successfully' });
    });

    getTask = this.executeAction(async (req: Request, res: Response) => {
        const task = await this.taskService.getTask(req.params.id, req.user.id);
        res.status(200).send(task)
    });

    getTasks = this.executeAction(async (req: Request, res: Response) => {
        const tasks = await this.taskService.getTasks();
        res.status(200).send(tasks)
    });

    getTasksByUser = this.executeAction(async (req: Request, res: Response) => {
        const tasks = await this.taskService.getTasksByUser(req.user.id);
        res.status(200).send(tasks)
    });

    updateTask = this.executeAction(async (req: Request, res: Response) => {
        await this.taskService.updateTask(req.params.id, req.body, req.user.id);
        res.status(202).send({ message: 'Task updated successfully' })
    });

    deleteTask = this.executeAction(async (req: Request, res: Response) => {
        await this.taskService.deleteTask(req.params.id, req.user.id);
        res.status(200).send({ message: 'Task deleted successfully' });
    });

    getTasksByCategory = this.executeAction(async (req: Request, res: Response) => {
        console.log("entoru")
        const tasks = await this.taskService.getTasksByCategory(req.params.categoryId, req.user.id);
        res.status(200).send(tasks)
    });

    getConcludedTasks = this.executeAction(async (req: Request, res: Response) => {
        const tasks = await this.taskService.getConcludedTasks(req.user.id);
        res.status(200).send(tasks)
    });

    getPendingTasks = this.executeAction(async (req: Request, res: Response) => {
        const tasks = await this.taskService.getPendingTasks(req.user.id);
        res.status(200).send(tasks)
    });

    countTasks = this.executeAction(async (req: Request, res: Response) => {
        const count = await this.taskService.countTasks(req.user.id);
        res.status(200).send({ count })
    });
    
    getAverageTaskConcluded = this.executeAction(async (req: Request, res: Response) => {
        const average_percentual = await this.taskService.getAverageTasksFinalized(req.user.id);
        res.status(200).send({ average_percentual })
    });

    getNewerTask = this.executeAction(async (req: Request, res: Response) => {
        const tasks = await this.taskService.getNewerTask(req.user.id);
        res.status(200).send(tasks)
    });

    getOlderTask = this.executeAction(async (req: Request, res: Response) => {
        const tasks = await this.taskService.getOlderTask(req.user.id);
        res.status(200).send(tasks)
    });

    getTaskWithLongerDescription = this.executeAction(async (req: Request, res: Response) => {
        const task = await this.taskService.getTaskWithLongerDescription(req.user.id);
        res.status(200).send(task)
    });

    getTasksGroupedByCategory = this.executeAction(async (req: Request, res: Response) => {
        const tasks = await this.taskService.getTasksGroupedByCategory(req.user.id);
        res.status(200).send(tasks)
    });
}

const taskService = TaskServiceImpl
export default new TaskController(taskService)