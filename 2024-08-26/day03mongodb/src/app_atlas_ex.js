const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://hsh2222:1234@new.aoscz.mongodb.net/testdb?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("testdb");
    const collection = database.collection("testcol");

    const doc = { name: "김범준", age: 23 };
    const result = await collection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);

    const query = { _id: result.insertedId };
    const fetch = await collection.findOne(query);
    console.log("Fetched document:", fetch);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
