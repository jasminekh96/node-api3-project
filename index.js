require('dotenv').config();

// code away!
const server = require('./server');

const port = process.env.PORT || 5001;

server.listen(port, () => {
	console.log(`\n* Server running on http://localhost:${port}*\n`);
});
