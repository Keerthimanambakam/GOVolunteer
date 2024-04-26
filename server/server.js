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
import bodyParser from 'body-parser';
=======
<<<<<<< HEAD
import bodyParser from 'body-parser';
=======
<<<<<<< HEAD
=======
import bodyParser from 'body-parser';
>>>>>>> b9e5b0a4f244adc51b07bb6efeb19d46de0d84ef
>>>>>>> 4a0f3082c605446168e8e32dd0933022f71a9b01
>>>>>>> dc7783114bd63a9f12ec6b2fe00709e181a05a9a

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8800;

dbConnection();

app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());
<<<<<<< HEAD

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

=======
<<<<<<< HEAD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
=======
<<<<<<< HEAD
=======
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
>>>>>>> b9e5b0a4f244adc51b07bb6efeb19d46de0d84ef
>>>>>>> 4a0f3082c605446168e8e32dd0933022f71a9b01
>>>>>>> dc7783114bd63a9f12ec6b2fe00709e181a05a9a
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));


app.use(router);


<<<<<<< HEAD
=======
<<<<<<< HEAD
app.get('/',(req,res)=>{
    res.send("asdfghjk");
});
=======
<<<<<<< HEAD
=======
app.get('/',(req,res)=>{
    res.send("asdfghjk");
});
>>>>>>> b9e5b0a4f244adc51b07bb6efeb19d46de0d84ef
>>>>>>> 4a0f3082c605446168e8e32dd0933022f71a9b01

app.post('/',(req,res)=>{
    res.send("hello from govolunteer!!");
});

>>>>>>> dc7783114bd63a9f12ec6b2fe00709e181a05a9a
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});
