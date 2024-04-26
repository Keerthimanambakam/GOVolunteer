import mongoose from "mongoose";

const dbConnection=async()=>{
    try{
<<<<<<< HEAD
        const dbConnection=await mongoose.connect(process.env.MONGODB_URL);
=======
<<<<<<< HEAD
        const dbConnection=await mongoose.connect(process.env.MONGODB_URL);
=======
        const dbConnection=await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser: true,
        

    });
>>>>>>> b9e5b0a4f244adc51b07bb6efeb19d46de0d84ef
>>>>>>> 4a0f3082c605446168e8e32dd0933022f71a9b01
        console.log("DB connected successfully")
    }
    catch(error)
    {
    console.log("db error"+error)
    }
}

export default dbConnection