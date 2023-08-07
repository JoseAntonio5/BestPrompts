import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDB is already running.');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "BestPrompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log('MongoDB Connected')
    } catch (error) {
        console.log(error);
    }
}