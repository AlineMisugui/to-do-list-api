import { Request, Response } from "express";
import BaseController from "../../senior/BaseController";
import { UserRequest } from "./user.dto";
import UserServiceImpl from "./userImpl.service";

class UserController extends BaseController {
    login = this.executeAction(async (req: Request, res: Response) => {
        const token = await userService.login(req.body.email, req.body.password);
        res.status(200).send({ token: token });
    });

    createUser = this.executeAction(async (req: Request, res: Response) => {
        await userService.createUser(req.body as UserRequest);
        res.status(201).send({ message: 'User created successfully'});
    });

    getUser = this.executeAction(async (req: Request, res: Response) => {
        const user = await userService.getUser(req.user.id);
        res.status(200).send(user)
    });

    getUsers = this.executeAction(async (req: Request, res: Response) => {
        const users = await userService.getUsers();
        res.status(200).send(users)
    });

    updateUser = this.executeAction(async (req: Request, res: Response) => {
        const user = await userService.updateUser(req.user.id, req.body);
        res.status(202).send({ message: 'User updated successfully' })
    });

    deleteUser = this.executeAction(async (req: Request, res: Response) => {
        await userService.deleteUser(req.user.id);
        res.status(200).send({ message: 'User deleted successfully' });
    });
}

const userService = UserServiceImpl
export default new UserController()