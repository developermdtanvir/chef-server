const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()



const app = express();

// db user chef password : E0A6rONxtKVq8ACl


// middleware 

app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.338egrb.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

client.connect((err) => {
    const collection = client.db(process.env.DB_USER).collection("products");

    // perform actions on the collection object
    const product = { name: "Modhu", price: 120, quantity: 30 };
    collection.insertOne(product).then((result) => {
        console.log("One product added");
    });
    console.log("database connected");
});


const chefCollection = client.db('chef').collection('all_chef');


async function run() {
    try {

        app.get('/chef', async (req, res) => {
            const query = {};
            const cursor = await chefCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/chef/:id', async (req, res) => {
            const id = req.params.id;
            const query = new ObjectId(id);
            const result = await chefCollection.findOne(query);
            res.send(result);
        })


    } finally {
        await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(3000, () => console.log("hello world"))