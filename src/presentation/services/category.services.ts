import { CategoryModel } from "../../data/mongo/models/category.model";
import { PaginationDto } from "../../domain";

export class CategoryServices {
  constructor() {}

  async getCategories(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const [total, categories] = await Promise.all([
      CategoryModel.countDocuments(),
      CategoryModel.find()
        .skip((page - 1) * limit)
        .limit(limit),
    ]);

    return {
      page,
      limit,
      total,
      next: `/api/category?page=${page + 1}&limit=${limit}`,
      prev:
        page - 1 > 0 ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
      categories: categories.map(
        ({
          id,
          categoryName,
          categoryDescription,
          categoryAvailable,
          categorySrc,
        }) => ({
          id,
          categoryName,
          categoryDescription,
          categoryAvailable,
          categorySrc,
        })
      ),
    };
  }
}
