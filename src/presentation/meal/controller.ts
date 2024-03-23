import { Request, Response } from "express";
import { PaginationDto } from "../../domain";
import { MealServices } from "../services/meal.services";

export class MealsController {
  constructor(private readonly mealServices: MealServices) {}

  getMeals = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return res.status(400).json({ error });

    this.mealServices
      .getMeals(paginationDto!)
      .then((data) => res.status(200).json({ data }))
      .catch((err) => res.status(400).json({ err }));
  };
}
