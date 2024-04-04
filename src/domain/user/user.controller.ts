import { Request, Response } from "express";
import BaseController from "../../senior/BaseController";
import UserServiceImpl from "./userImpl.service";

class UserController extends BaseController {
    createUser = this.executeAction(async (req: Request, res: Response) => {
        const user = await userService.createUser(req.body);
        res.status(201).send({ message: 'User created successfully' });
    });

    getUser = this.executeAction(async (req: Request, res: Response) => {
        const user = await userService.getUser(req.params.id);
        res.status(200).send(user)
    });

    getUsers = this.executeAction(async (req: Request, res: Response) => {
        const users = await userService.getUsers();
        res.status(200).send(users)
    });

    updateUser = this.executeAction(async (req: Request, res: Response) => {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).send(user)
    });

    deleteUser = this.executeAction(async (req: Request, res: Response) => {
        await userService.deleteUser(req.params.id);
        res.status(200).send({ message: 'User deleted successfully' });
    });
}

const userService = UserServiceImpl
export default new UserController()