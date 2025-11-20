import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";

let sequelize: Sequelize;

if (env === "development") {
  const url = process.env.DEV_DATABASE_URL || "postgresql://postgres:1234@localhost:5423/postgres";
  sequelize = new Sequelize(url, {
    dialect: "postgres",
    logging: false,
  });
}
else if (env === "production") {
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
}
else throw new Error(`Ambiente desconhecido: ${env}`);

export default sequelize;
