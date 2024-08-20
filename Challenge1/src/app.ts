// src/app.ts
import "reflect-metadata";
import express, { Application } from "express";
import bodyParser from "body-parser";
import universityRoutes from "./routes/UniversityRoutes";
import { AppDataSource } from "./data-source";

const app: Application = express();
app.use(bodyParser.json());

AppDataSource.initialize()
  .then(() => {
    app.use("/university", universityRoutes);

    app.listen(3000, () => {
      console.log("Server running on localhost:3000");
    });
  })
  .catch((error) =>
    console.log("Error during Data Source initialization:", error),
  );

export default app;
