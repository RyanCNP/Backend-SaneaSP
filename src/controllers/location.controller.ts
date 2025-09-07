import { ApiError } from "../errors/ApiError.error";

const API_KEY = process.env.LOCATIONIQ_KEY;
export const geoconding = async (address: any): Promise<Location | ApiError> => {
    const url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${encodeURIComponent(address)}&format=json`;
    const response = await fetch(url);

    if (response.status === 404) {
        return new ApiError('Não foi possível achar o endereço', 404);
    }
    const data: any[] = await response.json();

    const coordanates: Location = data[0]

    return coordanates;
}

export const reverGeocolding = async (lat: number, lon: number): Promise<Location | ApiError> => {
    const url = `us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${lat}&lon=${lon}&format=json`;

    const response = await fetch(url);
    if (!response.ok) {
        return new ApiError('Erro na requisição', response.status);
    }
    const data: any[] = await response.json();

    const address: Location = data[0]

    return address;
}