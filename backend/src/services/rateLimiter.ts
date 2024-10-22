import rateLimit from "express-rate-limit";


export const authApiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 3,
    message: {
        msg: "Too many request from this ip  . PLease try again after some time"
    }
})