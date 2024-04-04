import BaseController from "../../senior/BaseController";
import CategoryServiceImpl from "./categoryImpl.service";
import { CategoryService } from "./category.service";
import { Request, Response } from "express";

class CategoryController extends BaseController {
    private categoryService: CategoryService

    constructor(categoryService: CategoryService) {
        super()
        this.categoryService = categoryService
    }

    createCategory = this.executeAction(async (req: Request, res: Response) => {
        const category = await this.categoryService.createCategory(req.body);
        res.status(201).send({ message: 'Category created successfully' });
    });

    getCategory = this.executeAction(async (req: Request, res: Response) => {
        const category = await this.categoryService.getCategory(req.params.id);
        res.status(200).send(category)
    });

    getCategories = this.executeAction(async (req: Request, res: Response) => {
        const categories = await this.categoryService.getCategories();
        res.status(200).send(categories)
    });

    updateCategory = this.executeAction(async (req: Request, res: Response) => {
        const category = await this.categoryService.updateCategory(req.params.id, req.body);
        res.status(200).send(category)
    });

    deleteCategory = this.executeAction(async (req: Request, res: Response) => {
        await this.categoryService.deleteCategory(req.params.id);
        res.status(200).send({ message: 'Category deleted successfully' });
    });
}

const categoryService = CategoryServiceImpl
export default new CategoryController(categoryService)