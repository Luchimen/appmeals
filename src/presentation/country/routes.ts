import { Router } from "express";
import { CountryController } from "./controller";
import { CountryServices } from "../services/country.services";

export class CountryRoutes {
  constructor() {}

  static get routes(): Router {
    const router = Router();

    const countryServices = new CountryServices();
    const countryController = new CountryController(countryServices);

    router.get("/", countryController.getCountries);

    return router;
  }
}
