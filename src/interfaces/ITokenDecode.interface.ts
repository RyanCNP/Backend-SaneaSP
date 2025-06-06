import { JwtPayload } from "jsonwebtoken";

export interface ITokenDecode extends JwtPayload{
    id : number
}