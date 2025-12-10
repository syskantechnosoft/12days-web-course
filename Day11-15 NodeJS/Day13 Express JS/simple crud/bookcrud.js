const express = require('express'); 
const bodyParser = require('body-parser');
const app = express();  
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
const books = [
    {id:1,name:"Harry Potter",author:"J.K. Rowling",year:2001},
    {id:2,name:"The Hobbit",author:"J.R.R. Tolkien",year:1937},
    {id:3,name:"The Lord of the Rings",author:"J.R.R. Tolkien",year:1954},
    {id:4,name:"The Hitchhiker's Guide to the Galaxy",author:"Douglas Adams",year:1978},
    {id:5,name:"The Lord of the Rings",author:"J.R.R. Tolkien",year:1954},
];

//add Book End point 
app.post("/api/books",(req,res)=>{
    const newBook = {
        id:books.length+1,
        name : req.body.name,
        author:req.body.author,
        year:req.body.year
    };
    //[name,author,year]= {req.body}   //array destructuring

    books.push(newBook);

    res.status(201).json({
        message:"Book created Successfully",
        book : newBook
    })

});

//Get All books
app.get("/api/books",(req,res)=>{
    res.json({
        count:books.length,
        book:books
    })
});

//Get Book by ID
app.get("/api/books/:id",(req,res)=>{
    const book =books.find(b=>b.id===parseInt(req.params.id));

    if(!book)
        return res.status(404).json({error:'Book Not found!!!'});
    res.json(book);
});

//Full Update using PUT
app.put("/api/books/:id", (req,res)=>{
    const bookIndex =books.findIndex(b=>b.id===parseInt(req.params.id));

    if(bookIndex===-1)
        return res.status(404).json({error:'Book Not found!!!'});

     books[bookIndex]  = {
        id:parseInt(req.params.id),
        name : req.body.name,
        author:req.body.author,
        year:req.body.year
    };
    
     res.status(201).json({
        message:"Book Updated Successfully",
        book : books[bookIndex]
    })
});

//Partial Update using PATCH
app.patch("/api/books/:id",(req,res)=>{
     const book =books.find(b=>b.id===parseInt(req.params.id));

    if(!book)
        return res.status(404).json({error:'Book Not found!!!'});

    if(req.body.name) book.name = req.body.name;
    if(req.body.author) book.author = req.body.author;
    if(req.body.year) book.year = req.body.year;

     res.status(201).json({
        message:"Book Updated Partially",
        book : book
    })
});


//Delete operation

app.delete("/api/books/:id",(req,res)=>{
    
    const bookIndex =books.findIndex(b=>b.id===parseInt(req.params.id));

    if(bookIndex===-1)
        return res.status(404).json({error:'Book Not found!!!'});

    const deletedBook = books.splice(bookIndex,1)[0];

    res.json({
        message:"Book Deleted Successfully",
        book: deletedBook
    })
});

app.listen(3001,()=>{
    console.log("CRUD App is running on port : 3001")
});