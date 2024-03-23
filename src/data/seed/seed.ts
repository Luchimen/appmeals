import { envs } from "../../config/envs";
import {
  CategoryModel,
  CountryModel,
  MealModel,
  MongoDataBase,
  seedData,
} from "../";

(async () => {
  await MongoDataBase.connect({
    dbName: envs.DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  await main();

  await MongoDataBase.disconnect();
})();

const randomBetween0AndX = (x: number) => {
  return Math.floor(Math.random() * x);
};

async function main() {
  //Eliminamos todos los registros de la base de datos
  await Promise.all([
    CategoryModel.deleteMany(),
    CountryModel.deleteMany(),
    MealModel.deleteMany(),
  ]);
  //1.-Insertamos categorias

  const categories = await CategoryModel.insertMany(seedData.categories);

  const countries = await CountryModel.insertMany(seedData.country);

  const meals = await MealModel.insertMany(
    seedData.meals.map((meal) => {
      return {
        ...meal,
        mealCategory:
          categories[randomBetween0AndX(seedData.categories.length - 1)]._id,
        mealCountry:
          countries[randomBetween0AndX(seedData.country.length - 1)]._id,
      };
    })
  );

  console.log("SEEDED");
}
