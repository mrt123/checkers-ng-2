var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();

var parseServer = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/dev',
    appId: 'CHECKERS_2',
    masterKey: 'MASTER_KEY', // Keep this key secret!
    serverURL: 'http://localhost:1337/parse'
});

app.use('/parse', parseServer);

app.post('/parse/classes/Game', function (req, res, next) {
    console.log('Creating a game  ...');
    next(); // pass control to the next handler
});

app.listen(1337, function() {
    console.log('parse-server-example running on port 1337.');
});