'use strict';

var config = require('config');
var express = require('express');
var db = require('./models');
var app = express();

app.use(function(req, res, next){
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(require('./apis'));

// Start web server at port 3000
db.sequelize.sync().then(function () {
    var port = config.get('server.port');
    var server = app.listen(port, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Server start at http://%s:%s', host, port);
    });
});

