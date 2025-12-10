const express = require ("express");

const app=express();

app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.get("/about",(req,res)=>{
    res.send("This is about page");
});

app.get("/me",(req,res)=>{
    res.send("Its me!!!!");
});

app.listen(3001,()=>{
    console.log("Server is running on port 3001");
});

module.exports=app;