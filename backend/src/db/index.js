import mongoose from "mongoose";
import { DB_Name } from "../constant.js";

const connectDB=async ()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGO_URL}/${DB_Name}`)

        console.log(`\nMongoDb connected !! DB Host : ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MONGODB connection error",error);
        process.exit(1)
    }
}

export default connectDB;