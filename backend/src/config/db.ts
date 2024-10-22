import mongoose, { MongooseError } from "mongoose"
import { DB_URL } from "./dotenv"

export const connect_db = async () => {
    mongoose.connect(DB_URL).then((res) => {
        console.log(":-connection to mongodb is succesfull !");
    }).catch((err) => {
        console.log(":-connection to mongodb is failed !", err);
    })
}
