var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();

var api = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/dev',
    appId: 'CHECKERS_2',
    masterKey: 'MASTER_KEY', // Keep this key secret!
    serverURL: 'http://localhost:1337/parse'
});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

app.listen(1337, function() {
    console.log('parse-server-example running on port 1337.');
});