/**
 * Create express server, this should exist in root directory of angular app
 */

const express = require('express');
const app = express();
const path = require('path');

//Tell the express server to serve up the static files that are created in dist folder
app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8080);

//PathLocationStrategy - which angular application uses for routing
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})

console.log('Console listening!');