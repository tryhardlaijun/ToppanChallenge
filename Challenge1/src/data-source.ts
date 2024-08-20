// src/data-source.ts
import { DataSource } from "typeorm";
import { University } from "./entity/University";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost", // Use environment variable or default to 'localhost'
  port: parseInt(process.env.DB_PORT || "5432"), // Use environment variable or default to 5432
  username: process.env.DB_USER || "your_username", // Use environment variable or default to 'your_username'
  password: process.env.DB_PASSWORD || "your_password", // Use environment variable or default to 'your_password'
  database: process.env.DB_NAME || "university_db", // Use environment variable or default to 'university_db'
  synchronize: true,
  logging: false,
  entities: [University],
  migrations: [],
  subscribers: [],
});
