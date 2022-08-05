const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 4000
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://loan-pro:Mn7p1Uzbp4Izdi7Q@cluster0.6k0tdty.mongodb.net/loan-pro?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        await client.connect();

        const loanDataCollection = client.db("loan").collection('loanDetails')

        app.post('/loanDetails', async (req, res) => {
            const loan = req.body;
            console.log(loan)
            const result = await loanDataCollection.insertOne(loan)
            res.send(result)
        })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})