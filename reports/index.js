
 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
const db = require('./utils/db-mananger');


const port = 4004;

var taskPool = mysql.createPool({
	host: "arturogp.com",
	user: "microtasks",
	password: "micro1029384756",
	database: "microservices-tasks"
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, GET, DELETE, PATCH");
    next();
  });

// Done.
app.get('/reports/tasks', (req, res) => {
    let real_time = req.query.real_time;
    let todaysDate = Date();

    db.getTaskReportAdmin(todaysDate, function(result, isSuccess){
        if (!isSuccess) {
            res.status(400);
            res.send(result);
        }

        res.send(result);
    });
});

// Done.
app.get('/reports/habits', (req, res) => {
    let real_time = req.query.real_time;
    let todaysDate = Date();

    db.getHabitsReportAdmin(todaysDate, function(result, isSuccess){
        if (!isSuccess) {
            res.status(400);
            res.send(result);
        }

        res.send(result);
    });
});

// Done.
app.get('/reports/tasks/:userId', (req, res) => {
    let userId = req.params.userId;
    let todaysDate = Date();

    console.log("USER ID : " + userId);
    db.getTaskReportUser(userId, todaysDate, function(result, isSuccess) {
        if (!isSuccess) {
            res.status(400);
            res.send(result);
        }

        res.send(result);
    });
});

// Done.
app.get('/reports/habits/:userId', (req, res) => {
    let userId = req.params.userId;

    console.log("USER ID : " + userId);

    db.getHabitsReportUser(userId, function(result, isSuccess) {
        if (!isSuccess) {
            res.status(400);
            res.send(result);
        }

        res.send(result);
    });
});

app.get('/discover', (req,res) => {
    res.send('reports');
});

app.get('*', (req, res) => {
    res.send('Reports MicroService v1.0.0');
});

app.listen(port);
console.log('Reports MicroService Listening on port ' + port + '...');