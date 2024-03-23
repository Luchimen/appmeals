import { Request, Response } from "express";
import { PaginationDto } from "../../domain";
import { CountryServices } from "../services/country.services";

export class CountryController {
  constructor(private readonly countryServices: CountryServices) {}

  getCountries = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return res.status(400).json({ error });
    this.countryServices
      .getCountries(paginationDto!)
      .then((countries) => res.status(200).json({ countries }))
      .catch((err) => res.status(400).json({ err }));
  };
}
