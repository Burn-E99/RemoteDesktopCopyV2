const mongoose = require('mongoose');
const http = require('http');
const fs = require('fs');

const port = 8080;

const serveFile = (req, res) => {
	let file = '';
	let type = 'text/html';
	switch (req.url) {
		case '/':
			file = './static/html/index.html';
			break;
		default:
			if (req.url.startsWith('/css')) {
				file = './static' + req.url;
				type = 'text/css';
			} else if (req.url.startsWith('/js')) {
				file = './static' + req.url;
				type = 'text/javascript';
			} else {
				file = './static/html/errors/404.html';
				break;
			}
	}

	let contents = '';
	try {
		contents = fs.readFileSync(file, 'utf8');
	}
	catch (e) {
		console.log(e);
		contents = fs.readFileSync('./static/html/errors/500.html', 'utf8');
	}

	res.writeHead(200, { 'Content-Type': type });
	res.write(contents);
	res.end();
};

http.createServer((req, res) => {
	switch (req.url) {
		case '/api':
			console.log('api');
			break;
		default:
			serveFile(req, res);
			break;
	}
}).listen(port);

console.log(`Node.JS Server running at port ${port}`);