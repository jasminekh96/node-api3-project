const express = require('express');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
	// do your magic!
});

router.post('/:id/posts', (req, res) => {
	// do your magic!
});

router.get('/', (req, res) => {
	// do your magic!
});

router.get('/:id', (req, res) => {
	// do your magic!
});

router.get('/:id/posts', (req, res) => {
	// do your magic!
});

router.delete('/:id', (req, res) => {
	// do your magic!
});

router.put('/:id', (req, res) => {
	// do your magic!
});

//custom middleware

// function validateUserId(req, res, next) {
// 	// do your magic!
// }
function validateUserId(user) {
	return function(req, res, next) {
		if (user && user === req.headers.user) {
			next();
		} else {
			res.status(403).json({ message: 'invalid user id' });
		}
	};
}

// function validateUser(req, res, next) {
//   // do your magic!
// }
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
}

module.exports = router;
