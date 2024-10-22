import express, { Request, RequestHandler, Response } from "express"
import { PORT } from "./config/dotenv";
import { connect_db } from "./config/db";
import { cloudinary_start } from "./config/cloudinary";
import { OTP } from "./services/otp/otp"
import { sendOTP } from "./services/email/sendOtp";
import { authRouter } from "./routes/auth/userAuth";
import { router as userRouter } from "./routes/user/user";
import cors from "cors"
import cookieParser from "cookie-parser";
import { authApiLimiter } from "./services/rateLimiter";
const app = express();
app.use(cors({
    origin: function (origin, callback) {
        const allowedOriginPattern = /http:\/\/localhost:\d{4}|https:\/\/your-production-domain\.com/;

        if (!origin) return callback(null, true); // Allow requests without origin, e.g., curl, Postman

        if (allowedOriginPattern.test(origin)) {
            callback(null, true);  // Origin matches the pattern
        } else {
            callback(new Error('Not allowed by CORS'));  // Origin is not allowed
        }
    },
    credentials: true  // Allow credentials (cookies)
}));
app.use(cookieParser()); // Use cookie-parser here
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// app.use('/api/auth/get-otp', authApiLimiter)
app.use('/api/auth/verify-otp', authApiLimiter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)




app.listen(PORT, async () => {
    let instance = OTP.getInstance();
    await connect_db();
    await cloudinary_start();
    console.log(`Server Started on port number ${PORT}`);

})