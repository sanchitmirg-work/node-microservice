const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

const posts = {};

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
	res.send(posts);
});

app.post('/posts', async (req, res) => {
	const id = randomBytes(4).toString('hex');
	const { title } = req.body;
	posts[id] = {
		id, title
	}
	await axios.post('http://localhost:4005/event', {
		type: 'PostCreated',
		data: {
			id, title
		}
	});
	res.status(200).send(posts[id]);
});

app.post('/event', (req, res) => {
	console.log(req.body);
	res.send({ status: 'OK' })
});


app.listen(4000, () => {
	console.log("Post Service Started");
})