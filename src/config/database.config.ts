import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV || "development";

let sequelize: Sequelize;

if (env === "development") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
  });
} else if (env === "production") {
  const databaseUrl = process.env.PROD_DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("PROD_DATABASE_URL é necessário para ambiente de produção");
  }

  sequelize = new Sequelize(databaseUrl, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} else throw new Error(`Ambiente desconhecido: ${env}`);

export default sequelize;
