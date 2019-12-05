const express = require('express');

const db = require('./userDb');
const pb = require('../posts/postDb');

const router = express.Router();

router.use(express.json());

router.post('/', validateUser, (req, res) => {
	db
		.insert(req.body)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message : 'could not post.',
			});
		});
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
	const postData = { ...req.body, user_id: req.params.id };
	pb
		.insert(postData)
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message : 'could not post',
			});
		});
});

router.get('/', (req, res) => {
	console.log(req.query);
	db
		.get(req.query)
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message : 'Could not get users.',
			});
		});
});

router.get('/:id', validateUserId, (req, res) => {
	res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
	db
		.getUserPosts(req.params.id)
		.then((posts) => {
			if (posts) {
				res.status(200).json(posts);
			} else {
				res.status(404).json({ message: 'cannot get posts.' });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message : 'Posts cannot be retrieved.',
			});
		});
});

router.delete('/:id', validateUserId, (req, res) => {
	db
		.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({ message: 'It has been removed.' });
			} else {
				res.status(400).json({ errorMessage: 'The post with this ID is not found.' });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				errorMessage : 'Could not be removed.',
			});
		});
});

router.put('/:id', validateUser, validateUserId, (req, res) => {
	db
		.update(req.params.id, req.body)
		.then(() => {
			res.status(200).json(req.body);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'Put update did not work' });
		});
});

//custom middleware

//anything with ID uses this middleware.
function validateUserId(req, res, next) {
	if (req.params.id) {
		db
			.getById(req.params.id)
			.then((user) => {
				if (user) {
					req.user = user;
					next();
				} else {
					res.status(404).json({ message: 'invalid user id' });
				}
			})
			.catch((error) => {
				console.log(error);
				res.status(500).json({
					message : 'The post information could not be retrieved.',
				});
			});
	}
}
function validateUser(req, res, next) {
	if (!req.body) {
		res.status(400).json({ message: 'missing required user data' });
	} else if (!req.body.name) {
		res.status(400).json({ message: 'missing required name field' });
	}
	next();
}

function validatePost(req, res, next) {
	if (!req.body) {
		res.status(400).json({ message: 'missing post data' });
	} else if (!req.body.text) {
		res.status(400).json({ message: 'missing required text field' });
	}
	next();
}

module.exports = router;
