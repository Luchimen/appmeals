import { MealModel } from "../../data";
import { PaginationDto } from "../../domain";

export class MealServices {
  constructor() {}

  async getMeals(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const [total, meals] = await Promise.all([
      MealModel.countDocuments(),
      MealModel.find()
        .skip((page - 1) * limit)
        .limit(limit),
    ]);

    return {
      page,
      limit,
      total,
      next: `/api/meal?page=${page + 1}&limit=${limit}`,
      prev: page - 1 > 0 ? `/api/meal?page=${page - 1}&limit=${limit}` : null,
      meals: meals.map(
        ({
          id,
          mealName,
          mealDrinkAlternative,
          mealCategory,
          mealCountry,
          mealInstruction,
          mealSrc,
          mealTags,
          mealYoutubeLink,
          mealIngredients,
          mealCookingTime,
          mealQuantityPeople,
        }) => ({
          id,
          mealName,
          mealDrinkAlternative,
          mealCategory,
          mealCountry,
          mealInstruction,
          mealSrc,
          mealTags,
          mealYoutubeLink,
          mealIngredients,
          mealCookingTime,
          mealQuantityPeople,
        })
      ),
    };
  }
}
