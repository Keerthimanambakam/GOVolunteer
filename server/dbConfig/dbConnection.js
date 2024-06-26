import mongoose from "mongoose";

const dbConnection=async()=>{
    try{
        const dbConnection=await mongoose.connect(process.env.MONGODB_URL);

        console.log("DB connected successfully")
    }
    catch(error)
    {
    console.log("db error"+error)
    }
}

export default dbConnection