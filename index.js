/*
*
* Auhtor: Zsolt Gyula Angyal
* Title: Homework Assignment #2
* Description: API for a pizza-delivery company with users, menu items, shopingcart and payment
* Date: 2019.03.21.
*
* Primary file for he API
*
*/


// Dependencies
const server = require('./lib/server');

// Declare the app
let app = {};

// Init function
app.init = ()=>{
	// Start the server
	server.init();
};

// Execute
app.init();

// Export the app
module.exports = app;