const express = require('express');
const cors = require('cors');



const app = express();

// db user chef password : E0A6rONxtKVq8ACl


// middleware 

app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.338egrb.mongodb.net/?retryWrites=true&w=majority`;

async function run() {
    try {

        app.get('/chef', (req, res) => {

        })



    } finally {
        await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(2000, () => console.log("hello world"))