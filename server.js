const express = require('express');
const helmet = require('helmet');

const userRouter = require('./users/userRouter');

const server = express();

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

module.exports = server;
