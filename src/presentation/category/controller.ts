import { Response, Request } from "express";
import { CategoryServices } from "../services/category.services";
import { PaginationDto } from "../../domain";

export class CategoryController {
  //DI
  constructor(private readonly categoryServices: CategoryServices) {}


  getCategories = (req: Request, res: Response) => {
    const { page = 1, limit = 5 } = req.query;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return res.status(400).json({ error });

    this.categoryServices
      .getCategories(paginationDto!)
      .then((categories) => res.status(200).json({ categories }));
  };
}
