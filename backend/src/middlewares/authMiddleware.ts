import { NextFunction, Request, Response } from "express";
import { Auth } from "../model/schema";

export const M_chechAuthRegisterData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let query = await Auth.findOne({ email: req.body.email })
        // console.log("query is : ", query);
        if (!query) {
            next();
        }
        else {
            res.status(401).json({
                msg: "Already Register With this username/email"
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: "Something went Wrong !"
        })
    }
}