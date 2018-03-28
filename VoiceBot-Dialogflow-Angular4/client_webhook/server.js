// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var filename = path.basename(__filename);
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Get our API routes 
const apis = require('./routes/appRoutes/api');

// Set our api routes
app.use('/api', apis);

// Get port from environment and store in Express.
const port = process.env.PORT || '3000';
app.set('port', port);

var server = app.listen(port, function () {
    var host = server.address().address
    console.log("Example app listening at http://%s:%s", host, port)
 })
module.exports = app;