var path = require('path');

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/bower_components', express.static(path.join(__dirname, 'dist/bower_components')));
app.use('/src', express.static(path.join(__dirname, 'dist/src')));
app.use('/app', express.static(path.join(__dirname, 'app')));

module.exports = app;
