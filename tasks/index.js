var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const port = 4003;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/user/:email/task', (req, res) => {
    let email = req.params.email;
    let task = req.body;

    // TODO: if real_time is true, then do a query to DB, else get cached results from Reports DB
});


app.get('/user/:email/task', (req, res) => {
    let email = req.params.email;

    // TODO: if real_time is true, then do a query to DB, else get cached results from Reports DB
});

app.delete('/task/:id', (req, res) => {
    let taskIdToRemove = req.params.id;

    // TODO: if real_time is true, then do a query to DB, else get cached results from Reports DB
});

app.put('/task/:id', (req, res) => {
    let taskIdToRemove = req.params.id;
    let task = req.body;


    // TODO: if real_time is true, then do a query to DB, else get cached results from Reports DB
});

app.get('/task/:id', (req, res) => {
    let taskId = req.params.id;

    // TODO: if real_time is true, then do a query to DB, else get cached results from Reports DB
});

app.get('*', (req, res) => {
    res.send('Reports MicroService v1.0.0');
});

app.listen(port);
console.log('Reports MicroService Listening on port ' + port + '...');