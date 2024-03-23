import { Router } from "express";
import { MealsController } from "./controller";
import { MealServices } from "../services/meal.services";

export class MealRoutes {
  constructor() {}
  static get routes(): Router {
    const router = Router();

    const mealServices = new MealServices();

    const mealsController = new MealsController(mealServices);

    router.get("/", mealsController.getMeals);

    return router;
  }
}
