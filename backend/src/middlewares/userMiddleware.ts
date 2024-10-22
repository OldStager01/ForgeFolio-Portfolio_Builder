import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv";
import { Auth } from "../model/schema";


interface JwtPayload {
    authId: string;
    profileId: string;
    iat: number; // or whatever other properties you have
}

export const M_userTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check for cookie presence and value
        let token = req.cookies['token'];
        if (!token) {
            return res.status(401).json({ msg: "UnAuthorized Request !" });
        }

        // Proceed with verification only if the cookie is present and has a value
        let verifiedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;


        if (verifiedToken) {
            if (verifiedToken.authId && verifiedToken.profileId) {
                let query = await Auth.findOne({ _id: verifiedToken.authId })
                if (query) {


                    req.authId = verifiedToken.authId;
                    req.profileId = verifiedToken.profileId;
                    next();
                }
            } else {
                return res.status(401).json({ msg: "UnAuthorized Request !" });

            }
        } else {
            return res.status(401).json({ msg: "UnAuthorized Request !" });
        }
    } catch (error) {
        console.log("error is : ", error);
        if (error instanceof TokenExpiredError) {
            // Handle token expiration (e.g., refresh token)
            return res.status(401).json({ msg: "Your authorization token has expired. Please log in again." });
        } else {
            return res.status(500).json({
                msg: "Unauthorized Request !"
            });
        }
    }
};