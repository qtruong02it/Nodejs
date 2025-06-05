import express from "express";
import bodyParser, { urlencoded } from "body-parser";
import viewEngine from "./config/viewEngine";
import initwebRouters  from './route/web';
import connectDB from'./config/connectDB';
require('dotenv').config();

let app=express();

app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));


viewEngine(app);
initwebRouters(app);

connectDB();

let port = process.env.PORT || 6969;
  
app.listen(port, ()=>{
    console.log("backend Nodejs is running on the port :" + port)
})

