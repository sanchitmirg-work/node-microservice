const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

const commentsByPostId = {};

app.use(cors());
app.use(bodyParser.json());

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id])
});

app.post('/posts/:id/comments', async (req, res) => {
    const { content } = req.body;
    const commentId = randomBytes(4).toString('hex');
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;
    await axios.post('http://localhost:4005/event', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            postId: req.params.id,
            content
        }
    })
    res.status(200).send(comments);

});

app.post('/event', (req, res) => {
    console.log(req.body);
    res.send({ status: 'OK' })
});

app.listen(4001, () => {
    console.log("Comment Service Started");
})