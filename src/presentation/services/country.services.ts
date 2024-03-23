import { CountryModel } from "../../data";
import { PaginationDto } from "../../domain";

export class CountryServices {
  constructor() {}

  async getCountries(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const [total, countries] = await Promise.all([
      CountryModel.countDocuments(),
      CountryModel.find()
        .skip((page - 1) * limit)
        .limit(limit),
    ]);

    return {
      page,
      limit,
      total,
      next: `/api/country?page=${page + 1}&limit=${limit}`,
      prev:
        page - 1 > 0 ? `/api/country?page=${page - 1}&limit=${limit}` : null,
      countries: countries.map(
        ({ id, countryName, countryAvailable, countrySrc }) => ({
          id,
          countryName,
          countryAvailable,
          countrySrc,
        })
      ),
    };
  }
}
