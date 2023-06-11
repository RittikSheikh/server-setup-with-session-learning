const { MongoClient } = require('mongodb');


const uri = "";
const client = new MongoClient(uri);

async function dbConnect(){
    try {
        await client.connect();
        console.log('mongo connected'.blue.bold)
    } catch (error) {
        console.log(error.name.bgRed, error.message.yellow, error.stack.cyan.bold)
    }
}

module.exports = {dbConnect, client};