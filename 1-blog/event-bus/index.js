const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/event', async (req, res) => {
    await axios.post('http://localhost:4000/event', req.body);
    await axios.post('http://localhost:4001/event', req.body);
    await axios.post('http://localhost:4002/event', req.body);

    res.send({ status: 'OK' });
})


app.listen(4005, () => {
    console.log('Event bus service running on 4005');
})