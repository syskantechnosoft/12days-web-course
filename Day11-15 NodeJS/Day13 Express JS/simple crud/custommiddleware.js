const express = require('express');

const app = express();

let startTime = '';
let duration = '';

//custom Request Logging middleware
const requestLogger = (req,res,next)=>{
     startTime = Date.now();

    //Logging request object in console
    console.log(`Request Received at : [${new Date().toISOString()}] with Http Method : ${req.method} and URL :${req.url} `);

    res.on('finish',()=>{
         duration = Date.now()- startTime;
        console.log(`Response sent in ${duration} ms and statuscode is : ${res.statusCode}`)
    });

    next();
};

app.use(requestLogger);

app.get("/",(req,res)=>{
    res.send( `Hello, Start time : ${startTime} Duration : ${duration}`);
});

app.listen(3001, ()=>{
    console.log("App is running in 3001");
})