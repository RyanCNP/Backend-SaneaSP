import { UserModel } from "../models/user.model"

export const autenticar = async (email : string, password : string) => {
    const login = await UserModel.findOne({
        where : {
            email : email,
            senha : password
        }
    })
    return login
}