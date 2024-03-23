import { Router } from "express";
import { CategoryController } from "./controller";
import { CategoryServices } from "../services/category.services";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();
    const categoryServices = new CategoryServices();
    const categoryController = new CategoryController(categoryServices);

    router.get("/",[] ,categoryController.getCategories);

    return router;
  }
}
