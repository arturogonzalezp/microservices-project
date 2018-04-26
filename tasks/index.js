var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const db = require('./utils/db-manager.js');

const port = 4003;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, GET, DELETE, PATCH");
    next();
  });

// DONE.
app.post('/user/:email/task', (req, res) => {
    let email = req.params.email;
    let task = req.body;

    db.addTask(email, task, function (result, isSuccess) {
        if (!isSuccess) {
            res.status(400);
            res.send(result);
        }

        res.send(result);
    });
});

// DONE.
app.get('/user/:email/task', (req, res) => {
    let email = req.params.email;

    db.getAllTasksForUserId(email, function(result, isSuccess) {
        if (!isSuccess) {
            res.status(400);
            res.send(result);
        }
        res.send(result);
    });
});

// DONE.
app.delete('/task/:id', (req, res) => {
    let taskIdToRemove = req.params.id;

    db.deleteTaskWithId(taskIdToRemove, function(result, isSuccess) {
        if (!isSuccess) {
            res.status(400);
            res.send(jsonResult);
        }

        res.send(result);
    });
});

// DONE.
app.put('/task/:id', (req, res) => {
    let taskId = req.params.id;
    let task = req.body;

    db.updateTask(taskId, task, function(result, isSuccess){
        if (!isSuccess) {
            res.status(400);
            res.send(jsonResult);
        }

        res.send(result);
    });
});

// DONE.
app.get('/task/:id', (req, res) => {
    let taskId = req.params.id;

    db.getTaskWithId(taskId, function(result, isSuccess) {
        if (!isSuccess) {
            res.status(400);
            res.send(jsonResult);
        }

        res.send(result);
    });
});

app.get('/discover', (req,res) => {
    res.send('tasks');
});

app.get('*', (req, res) => {
    res.send('Tasks MicroService v1.0.0');
});

app.listen(port);
console.log('Tasks MicroService Listening on port ' + port + '...');