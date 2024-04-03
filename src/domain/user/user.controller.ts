import { Request, Response } from "express";
import { UserService } from "./user.service";
import { UserServiceImpl } from "./userImpl.service";
import BaseController from "../../senior/BaseController";

class UserController extends BaseController {
    private userService: UserService

    constructor(userService: UserService) {
        super()
        this.userService = userService
    }

    createUser = this.executeAction(async (req: Request, res: Response) => {
        const user = await this.userService.createUser(req.body);
        res.status(201).send({ message: 'User created successfully' });
    });

    getUser = this.executeAction(async (req: Request, res: Response) => {
        const user = await this.userService.getUser(req.params.id);
        res.status(200).send(user)
    });

    getUsers = this.executeAction(async (req: Request, res: Response) => {
        const users = await this.userService.getUsers();
        res.status(200).send(users)
    });

    updateUser = this.executeAction(async (req: Request, res: Response) => {
        const user = await this.userService.updateUser(req.params.id, req.body);
        res.status(200).send(user)
    });

    deleteUser = this.executeAction(async (req: Request, res: Response) => {
        await this.userService.deleteUser(req.params.id);
        res.status(200).send({ message: 'User deleted successfully' });
    });
}

const userService = new UserServiceImpl()
export default new UserController(userService)