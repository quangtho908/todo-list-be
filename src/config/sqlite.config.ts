import { DataSource } from "typeorm";
import Tasks from "../entities/tasks";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: "./data/database.sql",
  entities: [Tasks],
  synchronize: true,
})