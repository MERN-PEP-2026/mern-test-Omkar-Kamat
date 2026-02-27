import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO DB CONNECTED");
    }catch(err){
        console.log("DATABASE NOT CONNECTED");
        process.exit(1);
    }
}

export default connectDB;