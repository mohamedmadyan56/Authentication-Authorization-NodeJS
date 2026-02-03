const mongoose = require('mongoose');
const express = require('express');
const app = express();


//Global middleware : parse json bodies


app.use(express.json());





//simple middleware to print  request info
 app.use((req,res,next)=>{
    console.log(`${req.method} request to ${req.url}`);
    next();
    
 })



 module.exports = app;