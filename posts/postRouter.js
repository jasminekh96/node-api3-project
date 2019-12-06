const express = require('express');
const pb = require('../posts/postDb');
const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
	console.log(req.query);
	pb
		.get(req.query)
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message : 'could not get posts',
			});
		});
});

router.get('/:id', validatePostId, (req, res) => {
	res.status(200).json(req.posts);
});

router.delete('/:id', validatePostId, (req, res) => {
	pb.remove(req.params.id).then((count) => {
		if (count > 0) {
			res.status(200).json({ message: 'It has been removed.' });
		} else {
			res.status(200).json(req.posts);
		}
	});
	// .catch((error) => {
	// 	console.log(error);
	// 	res.status(500).json({
	// 		errorMessage : 'Could not be removed.',
	// 	});
	// });
});

router.put('/:id', validatePostId, (req, res) => {
	pb
		.update(req.params.id, req.body)
		.then(() => {
			res.status(200).json(req.body);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'Put update did not work.' });
		});
});

// custom middleware

function validatePostId(req, res, next) {
	if (req.params.id) {
		pb
			.getById(req.params.id)
			.then((posts) => {
				if (posts) {
					req.posts = posts;
					next();
				} else {
					res.status(404).json({ message: 'invalid user ID' });
				}
			})
			.catch((error) => {
				console.log(error);
				res.status(500).json({
					message : 'The post info could not be retrieved',
				});
			});
	}
}

module.exports = router;
