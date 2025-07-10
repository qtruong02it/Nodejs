import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initwebRouters from './route/web';
import connectDB from './config/connectDB';
import cors from 'cors';
require('dotenv').config();

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors({ origin: true }));
const PORT = process.env.PORT || 8081;

app.use(cors({
    origin: 'http://localhost:3000', // nơi React đang chạy
    credentials: true
}));


viewEngine(app);
initwebRouters(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("backend Nodejs is running on the port :" + port)
})

