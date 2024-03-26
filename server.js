const mongoose = require('mongoose')
const express = require('express')
const app = express();
const port = 3000

const distributor = require('./Distributor')
const api = require('./api')

app.listen(port, () => {})

const uri = 'mongodb+srv://slide3:123@sanphams.9silvsv.mongodb.net/Lab';

app.use(express.json());
app.use('/api', api)

app.get('/', async (req, res) => {
    await mongoose.connect(uri)
    let dis = await distributor.find()

    res.send(dis)
})




