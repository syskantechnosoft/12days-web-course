const { MongoClient } = require('mongodb');
// Usage in Express
const express = require('express');
const app = express();

app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');
async function connectDB() {
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');
        return client.db('tata');
    } catch (error) {
        console.error('❌ Connection failed:', error);
        process.exit(1);
    }
}

let db;
connectDB().then(database => {
    db = database;
    app.listen(3001, () => {
        console.log('Server running on port 3001');
    });
});
app.get('/products', async (req, res) => {
    const products = await db.collection('products').find({}).toArray();
    res.json(products);
});

app.get('/users', async (req, res) => {
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
});

app.post('/users', async (req, res) => {
    const user = await db.collection('users').insertOne(req.body);
    res.json(user);
});

app.put('/users/:id', async (req, res) => {
    const user = await db.collection('users').updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    res.json(user);
});

app.delete('/users/:id', async (req, res) => {
    const user = await db.collection('users').deleteOne({ _id: req.params.id });
    res.json(user);
});

