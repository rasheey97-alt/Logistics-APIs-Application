import { ConnectionOptions } from "typeorm";
import { User } from "./src/models/User";
import { Package } from "./src/models/Package";

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "yourusername",
  password: process.env.DB_PASSWORD || "yourpassword",
  database: process.env.DB_DATABASE || "logistics",
  synchronize: true,
  logging: false,
  entities: [User, Package],
};

export default config;
