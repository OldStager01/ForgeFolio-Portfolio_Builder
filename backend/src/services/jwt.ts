import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/dotenv"


export const createToken = (authId: string, profileId: string): string => {
    let token = jwt.sign({ authId: authId, profileId: profileId }, JWT_SECRET)
    return token;
}

