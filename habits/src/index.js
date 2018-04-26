var express    = require('express')
var app        = express()
var bodyParser = require('body-parser')
var config     = require('./config/config')
var logger     = require('./utils/logger')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(config.mainRoute, require('./api'))

app.listen(config.port)
logger.log('Listening on http://localhost:' + config.port)