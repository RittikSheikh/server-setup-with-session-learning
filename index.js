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





