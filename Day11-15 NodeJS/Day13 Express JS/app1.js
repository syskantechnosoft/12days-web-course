const express = require ("express");

const app=express();

app.get("/",(req,res)=>{
    res.send("Welcome to Home Page!!!");
});

app.get("/about",(req,res)=>{
    res.send("<h1>About Page</h1><p>This is about page</p>");
});

app.get("/me",(req,res)=>{
    res.send("Its me!!!!");
});

app.get("/api/users",(req,res)=>{
    const users = [ { name : "John", age : 30 }, { name : "Jane", age : 25 } ];
    res.json(users);
});

app.get("/success",(req,res)=>{
    res.status(200).send("This is success page");
});

app.get("/me",(req,res)=>{
    res.send("Its me!!!!");
});

app.listen(3001,()=>{
    console.log("Server is running on port 3001");
});

module.exports=app;