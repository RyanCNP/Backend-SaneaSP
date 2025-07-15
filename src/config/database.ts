import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV || "development"; 

const databaseUrl = env == 'development' 
  ? process.env.DEV_DATABASE_URL 
  : process.env.PROD_DATABASE_URL

if (env === 'production' && !process.env.PROD_DATABASE_URL) {
  throw new Error('PROD_DATABASE_URL é necessário para ambiente de produção');
}

if (env === 'development' && !process.env.DEV_DATABASE_URL) {
  throw new Error('DEV_DATABASE_URL é necessário para ambiente de desenvolvimento');
}

const sequelize = new Sequelize(databaseUrl!, {
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

export default sequelize;
