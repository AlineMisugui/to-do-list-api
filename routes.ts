import { Router } from 'express';
import userController from './src/domain/user/user.controller';
import categoryController from './src/domain/category/category.controller';
import taskController from './src/domain/task/task.controller';
import { authenticate } from './src/auth/authentication.middleware';
import { validateUserRequest } from './src/middlewares/userInputsMiddleware';
import { validateTaskRequest } from './src/middlewares/taskInputsMiddleware';
import { validateCategoryRequest } from './src/middlewares/categoryInputsMiddleware';

const routes = Router();

routes.post('/login', userController.login)
routes.post('/register', validateUserRequest, userController.createUser)
routes.get('/user/all', authenticate, userController.getUsers)
routes.get('/user', authenticate, userController.getUser)
routes.put('/user', authenticate, validateUserRequest, userController.updateUser)
routes.delete('/user', authenticate, userController.deleteUser)

routes.get('/category/all', authenticate, categoryController.getCategories)
routes.get('/category/by-user', authenticate, categoryController.getCategoriesByUser)
routes.get('/category/:id', authenticate, categoryController.getCategory)
routes.post('/category', authenticate, validateCategoryRequest, categoryController.createCategory)
routes.put('/category/:id', authenticate, validateCategoryRequest, categoryController.updateCategory)
routes.delete('/category/:id', authenticate, categoryController.deleteCategory)

routes.get('/task/longer-description', authenticate, taskController.getTaskWithLongerDescription)
routes.get('/task/grouped-by-category', authenticate, taskController.getTasksGroupedByCategory)
routes.get('/task/concluded', authenticate, taskController.getConcludedTasks)
routes.get('/task/pending', authenticate, taskController.getPendingTasks)
routes.get('/task/count', authenticate, taskController.countTasks)
routes.get('/task/average', authenticate, taskController.getAverageTaskConcluded)
routes.get('/task/newer', authenticate, taskController.getNewerTask)
routes.get('/task/older', authenticate, taskController.getOlderTask)
routes.get('/task/by-category/:categoryId', authenticate, taskController.getTasksByCategory)

routes.get('/task/all', authenticate, taskController.getTasks)
routes.get('/task/by-user', authenticate, taskController.getTasksByUser)
routes.get('/task/:id', authenticate, taskController.getTask.bind(taskController))
routes.post('/task', authenticate, validateTaskRequest, taskController.createTask)
routes.put('/task/:id', authenticate, validateTaskRequest, taskController.updateTask.bind(taskController))
routes.delete('/task/:id', authenticate, taskController.deleteTask)

export {
    routes
}