import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

export const connectToMongodb = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error.message);
    }
}

export default connectToMongodb;