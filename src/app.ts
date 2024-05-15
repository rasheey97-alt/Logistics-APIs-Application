import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import ormconfig from "./ormconfig";
import userRoutes from "./routes/userRoutes";
import packageRoutes from "./routes/packageRoutes";
import { updatePackageStatus } from "./services/packageUpdater";

createConnection(ormconfig).then(async () => {
  const app = express();

  app.use(express.json());
  app.use("/api", userRoutes);
  app.use("/api", packageRoutes);

  updatePackageStatus();

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}).catch(error => console.log(error));
