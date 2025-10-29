import { ApiError } from "../errors/ApiError.error"
import { HttpCode } from "../enums/HttpCode.enum"
import type { DataLocation } from "../interfaces/data-location"

const API_KEY = process.env.LOCATIONIQ_KEY

export const geocoding = async (address: string): Promise<DataLocation> => {
  const url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${encodeURIComponent(address)}&format=json`
  const response = await fetch(url)

  if (response.status === 404) {
    throw new ApiError("Não foi possível achar o endereço", HttpCode.NotFound)
  }

  const data: any[] = await response.json()
  const coordinates: DataLocation = data[0]

  return coordinates
}

export const reverseGeocoding = async (lat: number, lon: number): Promise<DataLocation> => {
  const url = `https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${lat}&lon=${lon}&format=json`

  const response = await fetch(url)

  if (!response.ok) {
    throw new ApiError("Erro na requisição", response.status)
  }

  const data: any = await response.json()
  const address: DataLocation = data

  return address
}
