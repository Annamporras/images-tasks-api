import mongoose from "mongoose";


export const connectMongo = async () => {

    try {

        await mongoose.connect("mongodb://localhost:27017/images-tasks-api");

        console.log("Mongo connected");

    } catch (error) {

        console.error("Mongo connection error:", error);
        process.exit(1);
    }
}