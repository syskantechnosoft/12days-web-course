let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

console.log("connecting to mongodb");
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db("mydb");
  //Find the first document in the customers collection:
  dbo.collection("customers").findOne({}, function(err, result) {
    if (err) throw err;
    console.log("fetching data from mongodb");
    console.log(result.name);
    db.close();
  });
});