require('dotenv').config();
const express = require('express');
const massive = require('massive');
const { json } = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const port = 3001;

const app = express();
app.use(json());
app.use(cors());

app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: process.env.SESSION_SECRET,
		user: [],
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7 * 2 //2 weeks
		}
	})
);

massive(process.env.CONNECTION_STRING)
	.then((dbInstance) => app.set('db', dbInstance))
	.catch((err) => console.log(err));

app.get('/api/session', (req, res, next) => {
	res.status(200).json(req.session);
});

app.get('/api/logout', (req, res, next) => {
	req.session.destroy();
	res.status(200).send(req.session);
});

app.post('/api/auth/register', (req, res, next) => {
	req.session.user = req.body;
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
		.then((result) => {
			req.session.user = result;
			res.status(200).json(result);
		})
		.catch((err) => res.status(500).send(err));
});
app.get('/api/posts/:userid', (req, res, next) => {
	req.app
		.get('db')
		.helo_posts.find({ author_id: parseInt(req.params.userid) })
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(500).send(err));
});
app.get('/api/posts', (req, res, next) => {
	req.app
		.get('db')
		.query(
			'select helo_posts.id as post_id, title,img,content,author_id, username, password,profile_pic from helo_posts join helo_users on helo_users.id=helo_posts.author_id'
		)
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(500).send(err));
});
app.post('/api/post', (req, res, next) => {
	req.app
		.get('db')
		.helo_posts.insert(
			Object.assign({}, req.body, { author_id: req.session.user.id })
		)
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(500).send(err));
});
app.get('/api/post/:postid', (req, res, next) => {
	req.app
		.get('db')
		.query(
			`select helo_posts.id as post_id, title,img,content,author_id, username, password,profile_pic from helo_posts join helo_users on helo_users.id=helo_posts.author_id where helo_posts.id=${parseInt(
				req.params.postid
			)}`
		)
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(500).send(err));
});

app.listen(port, () => {
	console.log(`Port ${port} is listening...`);
});
