var express = require('express');
var http = require('http');
var app = express();

//var GameMaster = require('./GameMaster.js');

app.get('/api', function (req, res) {
    res.send('Hello World!');
});

app.all('/api/classes/Game', function (req, res) {
    console.log('request body : ' + JSON.stringify(req.headers));
    
    var vendorUrl = 'http://127.0.0.1:6004/_api';

    res.send({
        message: 'So you want a new game huh?',
        id: 123
    });
});

var server = app.listen(4011, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Express server listening at http://%s:%s', host, port);
});