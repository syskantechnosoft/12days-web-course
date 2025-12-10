const { MongoClient } = require('mongodb');

async function findOneExample() {
  const uri = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("mydb"); // Replace with your database name
    const collection = database.collection("customers"); // Replace with your collection name

    // Example 1: Find a document by a specific field
    const query1 = { name: "test" };
    const user1 = await collection.findOne(query1);

    if (user1) {
      console.log("Found user by name:", user1);
    } else {
      console.log("User 'test' not found.");
    }

    // Example 2: Find a document by _id (requires ObjectId conversion)
    const ObjectId = require('mongodb').ObjectId;
    const userId = new ObjectId("69327e70c93fc25b47090a4a"); // Replace with a valid _id
    const query2 = { _id: userId };
    const user2 = await collection.findOne(query2);

    if (user2) {
      console.log("Found user by _id:", user2);
    } else {
      console.log("User with specified _id not found.");
    }

    // Example 3: Find a document with projection (include/exclude fields)
    const query3 = { age: { $gte: 30 } };
    const projection = { name: 1, email: 1, _id: 0 }; // Include name and email, exclude _id
    const user3 = await collection.findOne(query3, { projection });

    if (user3) {
      console.log("Found user by age with projection:", user3);
    } else {
      console.log("User aged 30 or more not found.");
    }

  } finally {
    await client.close();
  }
}

findOneExample().catch(console.error);