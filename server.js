const express = require('express');

const server = express();

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
//custom middleware

function logger(req, res, next) {
	console.log(`${req.method} to ${req.originalUrl} at ${new Date()}`);
	next();
}

server.use(logger);
server.use(express.json());

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
module.exports = server;
