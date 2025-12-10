const express = require('express');

const app = express();

//Simple Middleware Example
let data = '';
//First Middleware
app.use((req, res, next) => {
    data += '1.Request received at :' + new Date().toISOString();
    console.log(data);
    next();
});

//Second middleware
app.use((req, res, next) => {
    data += '\n 2.Request received at :' + new Date().toISOString();
    console.log(data);
    next();
});

//Third middleware
app.use((req, res, next) => {
    data += '\n 3.Request received at :' + new Date().toISOString();
    console.log(data);
    next();
});
app.get("/",(req,res)=>{
    res.send(data);
});

app.listen(3001, ()=>{
    console.log("App is running on Port :3001");
})