import mongoose from "mongoose";

export const connectDB = async ()=>
{
    try 
    {
        await mongoose.connect(process.env.MONGO_URI);  
        console.log("MONGO CONNECTED SUCCSSFULLY !");          
    } catch (error) {
        console.error(`error connecting to MONGODB: ${error}`);
        process.exit(1) // exit with failure
    }
}