import type { Request, Response } from "express";
import * as locationService from "../services/location.service";
import { ApiError } from "../errors/ApiError.error";
import { HttpCode } from "../enums/HttpCode.enum";

export const getGeocoding = async (req: Request, res: Response) => {
  const address = req.query.endereco as string;

  if (!address) {
    throw new ApiError("Nenhum endereço foi informado", HttpCode.BadRequest);
  }

  const data = await locationService.geocoding(address);
  res.json(data);
};

export const getReverseGeocoding = async (req: Request, res: Response) => {
  const lat = req.query.lat as unknown as number;
  const lon = req.query.lon as unknown as number;

  if (!lat || !lon) {
    throw new ApiError(
      "Coordenadas não foram informadas corretamente",
      HttpCode.BadRequest,
    );
  }

  const address = await locationService.reverseGeocoding(lat, lon);
  res.json(address);
};
