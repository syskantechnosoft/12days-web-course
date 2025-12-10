const express = require('express'); 
const app = express();  
const bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 

app.get('/', (req, res) => { 
    res.send('Hello World!'); 
}); 

app.post('/add', (req, res) => { 
    const id= Date.now();
    const { name, age } = req.body; 
    res.json({ id, name, age }); 
}); 

app.put('/update', (req, res) => { 
    const { id, name, age } = req.body; 
    res.json({ id, name, age }); 
}); 

app.delete('/delete', (req, res) => { 
    const { id } = req.body; 
    res.json({ id }); 
}); 

app.listen(3001, () => { 
    console.log('Server is running on port 3001'); 
});