import { Router } from 'express';
import userController from './src/domain/user/user.controller';
import categoryController from './src/domain/category/category.controller';
import taskController from './src/domain/task/task.controller';

const routes = Router();
routes.post('/user', userController.createUser)
routes.get('/user', userController.getUsers)
routes.get('/user/:id', userController.getUser)
routes.put('/user/:id', userController.updateUser)
routes.delete('/user/:id', userController.deleteUser)
// routes.get('/teste', userController.teste);
// routes.get('/teste', (req, res) => userController.teste(req, res));

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