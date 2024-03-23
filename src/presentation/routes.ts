import { Router } from "express";
import { CategoryRoutes } from "./category/routes";
import { CountryRoutes } from "./country/routes";
import { MealRoutes } from "./meal/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    router.use("/api/category", CategoryRoutes.routes);
    router.use("/api/country", CountryRoutes.routes);
    router.use("/api/meal", MealRoutes.routes);

    return router;
  }
}
