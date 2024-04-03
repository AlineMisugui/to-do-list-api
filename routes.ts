import { Router } from 'express';
import userController from './src/domain/user/user.controller';

const routes = Router();
routes.post('/user', userController.createUser)
routes.get('/user', userController.getUsers)
routes.get('/user/:id', userController.getUser.bind(userController))
routes.put('/user/:id', userController.updateUser.bind(userController))
routes.delete('/user/:id', userController.deleteUser)
// routes.get('/teste', userController.teste.bind(userController));
// routes.get('/teste', (req, res) => userController.teste(req, res));

export {
    routes
}