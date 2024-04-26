import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import dbConnection from './dbConfig/dbConnection.js';
import router from "./routes/index.js";
import cookieParser from 'cookie-parser';
<<<<<<< HEAD
=======
import bodyParser from 'body-parser';
>>>>>>> b9e5b0a4f244adc51b07bb6efeb19d46de0d84ef

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8800;

dbConnection();

app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());
<<<<<<< HEAD
=======
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
>>>>>>> b9e5b0a4f244adc51b07bb6efeb19d46de0d84ef
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));


app.use(router);


<<<<<<< HEAD
=======
app.get('/',(req,res)=>{
    res.send("asdfghjk");
});
>>>>>>> b9e5b0a4f244adc51b07bb6efeb19d46de0d84ef

app.post('/',(req,res)=>{
    res.send("hello from govolunteer!!");
});

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});