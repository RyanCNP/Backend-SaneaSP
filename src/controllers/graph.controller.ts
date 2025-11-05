import type { Request, Response } from "express";
import type { IfilterGraph } from "../interfaces/graph";
import * as graphService from "../services/graph.service";

export const getMaioresPontuacoes = async (req: Request, res: Response) => {
  const filter = req.query as unknown as IfilterGraph;
  const result = await graphService.getBigPoints(filter);
  res.json(result);
};
