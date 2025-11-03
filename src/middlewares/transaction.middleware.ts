import { NextFunction, Request, Response } from "express";
import sequelize from "../config/database.config";

export const withTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();
  req.transaction = transaction;
  
  next()
};