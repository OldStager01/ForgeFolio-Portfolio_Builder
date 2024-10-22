import express, { Request, Response } from "express"
import { sendOTP } from "../../services/email/sendOtp";
import { OTP } from "../../services/otp/otp"
import bcrypt from "bcrypt"
import { Auth, Profile } from "../../model/schema";
import { createToken } from "../../services/jwt";
import { JWT_SECRET } from "../../config/dotenv";

import jwt from "jsonwebtoken"
import { generateUrl } from "../../services/url";
import { generateKey } from "crypto";
let bcrypt_salt = 10;

export const router = express.Router();
let otpInstance = OTP.getInstance()


export const userGetOtpController = async (req: Request, res: Response) => {
    try {

        if (!req.body.email) {
            return res.status(401).json({
                msg: "Email is required for sending otp !"
            })
        }
        const { email, password } = req.body;
        let current_otp;
        if (otpInstance) {
            current_otp = await otpInstance.generateOTP(email);
        }
        // this case is very rare !
        else {
            return res.status(500).json({
                msg: "OTP insatnce is null !"
            })
        }
        await sendOTP(email, current_otp)
        return res.json({
            msg: `OTP is sent succesfully to ${email} `
        })
    }
    catch (err) {
        // console.log("error is : ", err);

        return res.status(500).json({
            msg: "Something went wrong !"

        })
    }
}

export const userVerifyOtp_RegisterController = async (req: Request, res: Response) => {
    try {
        const { email, password, otp } = req.body;
        if (!email || !password || !otp) {
            return res.status(401).json({
                msg: "All fields are required!"
            });
        }
        if (otpInstance?.validateOtp(email, otp)) {
            const hashedPassword = await bcrypt.hash(password, bcrypt_salt);

            // Create user in Auth collection
            const newUser = await Auth.create({ email, password: hashedPassword });

            // Create an empty profile for the user
            const newProfile = {
                avatar: '#', // Default avatar
                name: '', // Default empty name
                about: '', // Default empty about
                descriptors: '', // Default empty descriptors
                email, // Email from the registration
                github: '', // Default empty GitHub
                linkedin: '', // Default empty LinkedIn
                skills: [], // Default empty skills array
                projects: [], // Default empty projects array
                education: [], // Default empty education array
                certifications: [], // Default empty certifications array
                courses: [], // Default empty courses array
                competitions: [], // Default empty competitions array
                extracurricular: [] // Default empty extracurricular array
            };

            const createdProfile = await Profile.create(newProfile); // Create profile in Profile collection

            // Update the Auth document with the profile ID
            newUser.profileId = createdProfile._id; // Set profileId to the new profile's ID
            newUser.portfolioUrl = generateUrl(newUser._id.toString())
            await newUser.save(); // Save the updated Auth document

            let token = createToken(newUser._id.toString(), newUser.profileId.toString())
            res.cookie('token', token, { httpOnly: true, secure: true }); // Set cookie in the response


            return res.status(200).json({
                otp_msg: "success",
                msg: "Registration Successful!",
                url: newUser.portfolioUrl

            });
        }
        return res.status(401).json({
            otp_msg: "Invalid OTP!"
        });
    } catch (error) {
        console.log("error is :  ", error);

        return res.status(500).json({
            msg: "Something went wrong!"
        });
    }
}

export const userLoginController = async (req: Request, res: Response) => {
    try {

        if (!req.body.email || !req.body.password) {
            return res.status(401).json({
                msg: "All Feilds Are required !"
            })
        }

        let query = await Auth.findOne({ email: req.body.email })
        if (query) {
            let isPasswordValid = await bcrypt.compare(req.body.password, query.password)

            if (isPasswordValid) {

                let token = createToken(query._id.toString(), query.profileId.toString())
                console.log("login token is : ", jwt.verify(token, JWT_SECRET));

                // Example of setting a cookie
                res.cookie('token', token, { httpOnly: true, secure: true }); // Set cookie in the response

                return res.status(200).json({
                    _id:query._id,
                    msg: "Login Successful ! ",
                })
            }
            return res.status(401).json({
                msg: "password Mismatch !"
            })
        }
        else {
            return res.status(400).json({
                msg: "User Not Found !"
            })
        }
    }
    catch (error) {
        console.log("error is : ", error);

        return res.status(500).json({
            msg: "something went wrong !"
        })
    }
}