var express = require('express');
var app = express();

//var GameMaster = require('./GameMaster.js');

app.get('/api', function (req, res) {
    res.send('Hello World!');
});

app.post('/api/game', function (req, res) {

    //var game = new GameMaster();

    res.send({
        message: 'So you want a new game huh?',
        id: 123,
        player1: {
            name: 'Joe'
        },
        player2: {
            name: 'Jill'
        },
        game : {}
    });
});

var server = app.listen(4011, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Express server listening at http://%s:%s', host, port);
});