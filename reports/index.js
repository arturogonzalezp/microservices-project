var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('*', (req, res) => {
    res.send('Reports MicroService v1.0.0');
});

app.listen(port);
console.log('Reports MicroService Listening on port ' + port + '...');