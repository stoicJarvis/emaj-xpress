import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectMongoDb = async () => {

    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        console.error('❌ MONGO_URI is not defined in .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoURI);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
}

export { connectMongoDb }