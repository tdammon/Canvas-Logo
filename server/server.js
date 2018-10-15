// Require express - gives us a function
const express = require('express');

// Create an instance of express by calling the function returned above - gives us an object
const app = express();
const port = 5000;

// express static file serving - public is the folder name
app.use(express.static('server/public/scripts'));

// Start up our server
app.listen(port, function(){
  console.log('listening on port', port);
});