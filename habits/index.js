var express    = require('express')
var app        = express()
var bodyParser = require('body-parser')
var config     = require('./config/config')
var logger     = require('./utils/logger')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, GET, DELETE, PATCH");

    next();
  });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(config.mainRoute, require('./api'))

app.listen(config.port)
logger.log('Listening on http://localhost:' + config.port)