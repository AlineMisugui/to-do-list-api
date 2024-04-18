import { Router } from 'express';
import userController from './src/domain/user/user.controller';
import categoryController from './src/domain/category/category.controller';
import taskController from './src/domain/task/task.controller';
import {authenticate} from './src/auth/authentication.middleware';

const routes = Router();

routes.post('/login', userController.login)
routes.post('/register', userController.createUser)
routes.get('/user/all', authenticate, userController.getUsers)
routes.get('/user', authenticate, userController.getUser)
routes.put('/user/:id', userController.updateUser)
routes.delete('/user/:id', userController.deleteUser)

routes.get('/category', categoryController.getCategories)
routes.get('/category/:id', categoryController.getCategory.bind(categoryController))
routes.post('/category', categoryController.createCategory)
routes.put('/category/:id', categoryController.updateCategory.bind(categoryController))
routes.delete('/category/:id', categoryController.deleteCategory)

routes.get('/task', taskController.getTasks)
routes.get('/task/:id', taskController.getTask.bind(taskController))
routes.post('/task', taskController.createTask)
routes.put('/task/:id', taskController.updateTask.bind(taskController))
routes.delete('/task/:id', taskController.deleteTask)

export {
    routes
}