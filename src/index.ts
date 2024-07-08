import { AppDataSource } from "./config/sqlite.config";
import Application from "./app";

async function bootstrap() {
  const app: Application = new Application();
  app
    .initDataSource(AppDataSource)
    .build()
}

bootstrap();