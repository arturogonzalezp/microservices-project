var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/reports/tasks', (req, res) => {
    let real_time = req.query.real_time;

    // TODO: if real_time is true, then do a query to DB, else get cached results from Reports DB
});

app.get('/reports/habits', (req, res) => {
    let real_time = req.query.real_time;

    // TODO: if real_time is true, then do a query to DB, else get cached results from Reports DB
});

app.get('/reports/tasks/user', (req, res) => {
    let userId = req.query.userId;
    // TODO: get results from a given user from tasks DB
});

app.get('/reports/habits/user', (req, res) => {
    let userId = req.query.userId;
    // TODO: get results from a given user from habits DB
});

app.get('*', (req, res) => {
    res.send('Reports MicroService v1.0.0');
});

app.listen(port);
console.log('Reports MicroService Listening on port ' + port + '...');