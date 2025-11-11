require("dotenv").config();

const env = process.env.NODE_ENV || "development";

let config;

if (env === "development") {
  config = {
      url: `postgresql://postgres:1234@${process.env.DB}:5423/postgres`,
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {}
  };
} else if (env === "production") {
  const databaseUrl = process.env.PROD_DATABASE_URL;
  if (!databaseUrl)
    throw new Error("PROD_DATABASE_URL é necessário para ambiente de produção");
  config = {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
    use_env_variable: "PROD_DATABASE_URL",
    logging: false,
  };
} else {
  throw new Error(`Ambiente desconhecido: ${env}`);
}

module.exports = config;
