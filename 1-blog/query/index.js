const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

const posts = {};

// posts = {
// 	'123df': {
// 		id: '123df',
// 		title: 'post title',
// 		comments: [{ id: 'dfsdf23', content: 'comments!' }]
// 	}
// }

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
	res.send(posts);
});


app.post('/event', (req, res) => {
	const { type, data } = req.body;
	if (type === 'PostCreated') {
		const { id, title } = data;
		posts[id] = { id, title, comments: [] };
	}

	if (type === 'CommentCreated') {
		const post = posts[data.postId];
		const { id, postId, content } = data;
		post.comments.push({ id, content });
		posts[postId] = post;
	}

	console.log(posts);

	res.send({ status: 'OK' });
})

app.listen(4002, () => {
	console.log("Query Service Started");
})