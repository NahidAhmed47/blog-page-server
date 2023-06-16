const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require("dotenv").config();

app.use(cors())
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.ze0g6j8.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10
});

async function run() {
  try {
    const database = client.db('blog-page');
    const blogCollection = database.collection('blogs');
    const upcomingEvents = database.collection('upcoming-events');
    const sponsored = database.collection('sponsored');

    app.get('/blogs', async(req, res)=>{
        const result = await blogCollection.find().toArray();
        res.send(result)
    })
    app.get('/upcoming-events', async(req, res)=>{
        const result = await upcomingEvents.find().toArray();
        res.send(result)
    })
    app.get('/sponsored', async(req, res)=>{
        const result = await sponsored.find().toArray();
        res.send(result)
    })
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', async (req, res) => {
    res.send('Server is running');
})

app.listen(port, async(req, res) => {
    console.log(`listening on ${port}`)
})