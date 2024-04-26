import mongoose from "mongoose";

const dbConnection=async()=>{
    try{
<<<<<<< HEAD
        const dbConnection=await mongoose.connect(process.env.MONGODB_URL);
=======
        const dbConnection=await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser: true,
        

    });
>>>>>>> b9e5b0a4f244adc51b07bb6efeb19d46de0d84ef
        console.log("DB connected successfully")
    }
    catch(error)
    {
    console.log("db error"+error)
    }
}

export default dbConnection