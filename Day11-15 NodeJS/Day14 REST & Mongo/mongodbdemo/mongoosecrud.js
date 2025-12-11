const mongoose = require('mongoose');
const express = require('express');

const app = express();
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017');
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        // return conn.connection.db('users');
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

let db;
connectDB().then(database => {
    db = database;
    app.listen(3001, () => {
        console.log('Server running on port 3001');
    });
});

app.post('/users', async (req, res) => {
    // Create (Insert) Single document
    // const result = await db.collection('users').insertOne({
    //     name: 'John',
    //     email: 'john@example.com',
    //     age: 30
    // });
    
    const user = await db.collection('users').insertOne(req.body);
    res.json(user);
});


app.get('/users', async (req, res) => {
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
});

// console.log('Inserted ID:', result.insertedId);
// Multiple documents
// const results = await db.collection('users').insertMany([
//     { name: 'John', email: 'john@example.com' },
//     { name: 'Jane', email: 'jane@example.com' }
// ]);
// console.log('Inserted IDs:', results.insertedIds);

// Find one document Read(Query)
// const user = await db.collection('users').findOne({ email: 'john@example.com' });
// // Find multiple documents
// const users = await db.collection('users').find({}).toArray();
// // Find with filter
// const activeUsers = await db.collection('users')
//     .find({ isActive: true })
//     .sort({ name: 1 }) // 1 = ascending, -1 = descending
//     .limit(10)
//     .toArray();
// // Find with conditions
// const filtered = await db.collection('users').find({
//     age: { $gt: 25, $lt: 50 }, // Greater than 25 and less than 50
//     isActive: true
// }).toArray();
// // Count documents
// const count = await db.collection('users').countDocuments({ isActive: true });

// // Update one document
// result = await db.collection('users').updateOne(
//     { _id: ObjectId('...') },
//     { $set: { name: 'Jane', age: 31 } }
// );
// console.log('Modified count:', result.modifiedCount);
// // Update multiple documents
// result = await db.collection('users').updateMany(
//     { age: { $lt: 18 } },
//     { $set: { isActive: false } }
// );
// // Increment field
// await db.collection('users').updateOne(
//     { _id: ObjectId('...') },
//     { $inc: { age: 1 } } // Increment age by 1
// );
// // Add to array
// await db.collection('users').updateOne(
//     { _id: ObjectId('...') },
//     { $push: { roles: 'admin' } } // Add 'admin' to roles array
// );


// // Delete one document
// result = await db.collection('users').deleteOne({ _id: ObjectId('...') });
// console.log('Deleted count:', result.deletedCount);
// // Delete multiple documents
// result = await db.collection('users').deleteMany({ age: { $lt: 18 } });
// // Clear collection
// await db.collection('users').deleteMany({});


