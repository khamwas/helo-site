require('dotenv').config();
const express = require('express');
const massive = require('massive');
const { json } = require('body-parser');
const cors = require('cors');
const port = 3001;

const app = express();
app.use(json());
app.use(cors());

massive(process.env.CONNECTION_STRING)
	.then((dbInstance) => app.set('db', dbInstance))
	.catch((err) => console.log(err));

app.post('/api/auth/register', (req, res, next) => {
	req.app
		.get('db')
		.helo_users.insert(req.body)
		.then((response) => res.status(200).json(response))
		.catch((err) => res.status(500).send(err));
});
app.post('/api/auth/login', (req, res, next) => {
	req.app
		.get('db')
		.helo_users.findOne(req.body)
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(500).send(err));
});
app.get('/api/posts/:userid', (req, res, next) => {
	req.app
		.get('db')
		.helo_posts.find({ author_id: parseInt(req.params.userid) })
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(500).send(err));
});
app.post('/api/post/:userid', (req, res, next) => {
	req.app
		.get('db')
		.helo_posts.insert(req.body, { author_id: parseInt(req.params.userid) })
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(500).send(err));
});
app.get('/api/post/:postid', (req, res, next) => {
	req.app
		.get('db')
		.helo_posts.findOne({ id: parseInt(req.params.postid) })
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(500).send(err));
});

app.listen(port, () => {
	console.log(`Port ${port} is listening...`);
});
