/*
*
* Server-related tasks
*
*
*
*/


// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const {StringDecoder} = require('string_decoder');
const config = require('./config');
const fs = require('fs');
const handlers = require('./handlers');
const helpers = require('./helpers');
const path = require('path');


// Instantiate the server module object
const server = {};

// Instantiate the HTTP server
server.httpServer = http.createServer((req, res)=>{
	server.unifiedServer(req, res);
});

// Instantiate the HTTPS server
server.httpsServerOptions = {
	'key': fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
	'cert': fs.readFileSync(path.join(__dirname, '/../https/cert.pem'))
};
server.httpsServer = https.createServer(server.httpsServerOptions, (req, reqs)=>{
	server.unifiedServer(req, res);
});

// All the server logic for both http and https server
server.unifiedServer = (req, res)=>{
	// Get the url and parse it
	const parsedUrl = url.parse(req.url, true);

	// Get the path
	const path = parsedUrl.pathname;
	const trimmedPath = path.replace(/^\/+|\/+$/g, '');

	// Get the query string as an object
	const queryStringObject = parsedUrl.query;

	// Get the http method
	const method = req.method.toLowerCase();

	//Get the header as an object
	const headers = req.headers;

	// Get the payload, if any
	const decoder = new StringDecoder('utf8');
	let buffer = '';
	req.on('data', (data)=>{
		buffer += decoder.write(data);
	});
	req.on('end', ()=>{
		buffer += decoder.end();

		// Choose the handler this request should go to. If one is not found, use the notFound handler
		let chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;

		// Construct the data object to send to the handler
		let data = {
			trimmedPath,
			queryStringObject,
			method,
			headers,
			'payload': helpers.parseJSONToObject(buffer)
		};
		// Route the request to the handler specified in the router
		chosenHandler(data, (statusCode, payload)=>{
			// use the status code called back by the handler, or default to 200
			statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

			// use the payload called back by the handler, or default an empty object
			payload = typeof(payload) === 'object' ? payload : {};

			// Convert the payload to a string
			const payloadString = JSON.stringify(payload);

			// Return the response
			res.setHeader('Content-Type', 'application/json');
			res.writeHead(statusCode);
			res.end(payloadString);

			// If the response is 200, print green, otherwise print red
			if(statusCode === 200){
				console.log('\x1b[32m%s\x1b[0m', `${method.toUpperCase()} /${trimmedPath} ${statusCode}`);
			} else {
				console.log('\x1b[31m%s\x1b[0m', `${method.toUpperCase()} /${trimmedPath} ${statusCode}`);
			}
		});
	});
};


// Define a request router
server.router = {
	'ping': handlers.ping,
	'users': handlers.users,
	'tokens': handlers.tokens,
	'menu': handlers.menu,
	'shoppingcart': handlers.shoppingcart,
	'order': handlers.order
};

// Init the script
server.init = ()=>{
	// Start the http server
	server.httpServer.listen(3000, ()=>{
		console.log('\x1b[36m%s\x1b[0m', `The server is started on port ${config.httpPort} in ${config.envname} mode now`);
	});

	// Start the https server
	server.httpsServer.listen(3001, ()=>{
		console.log('\x1b[36m%s\x1b[0m', `The server is started on port ${config.httpsPort} in ${config.envname} mode now`);
	})
}

// Export the server
module.exports = server;


