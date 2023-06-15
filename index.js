const express = require('express');
const cors = require('cors');
const colors = require('colors');
const { dbConnect, client } = require('./dbConnect');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())



dbConnect();
client


const Keyboard = client.db('Coretext-Corporation').collection('Keyboards');

app.get('/products', async(req, res) => {
    try {
        const cursor = Keyboard.find({});
        const result = await cursor.toArray();
        res.send(result)
        console.log(result)
    } catch (error) {
        console.log(error.name, error.message);
    }
})


app.post('/keyboards', async(req, res) => {
    try {
        const newKeyboard = req.body;
        const result = await Keyboard.insertOne(newKeyboard);
        console.log(result)
        if (result.acknowledged) {
            res.send({
                success: true,
                message: `${newKeyboard.name} inserted in db with id ${result.insertedId}`
            })
            }
            else{
                res.send({
                    success: false,
                    error: 'could not inserted the keyboard'
                })
        }
    } catch (error) {
        console.log(error.name, error.message)
    }
})




app.get('/', (req, res) => {
    res.send('server saying hello')
})

app.listen(port, () => {
    console.log('server up and ready')
})





// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<username>:<password>@cluster0.ix1iyof.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
