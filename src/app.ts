import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import { MongoDataBase } from "./data/mongo/mongo-database";

(async () => {
  main();
})();

async function main() {
  await MongoDataBase.connect({
    dbName: envs.DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });
  server.start();
}
