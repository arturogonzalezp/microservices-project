var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

const port = 4004;

var taskPool = mysql.createPool({
	host: "arturogp.com",
	user: "microtasks",
	password: "micro1029384756",
	database: "microservices-tasks"
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/reports/tasks', (req, res) => {
    let real_time = req.query.real_time;
    let todaysDate = Date();

    taskPool.getConnection(function (err, conn) {
        var query = "SELECT " + 
        "(SELECT COUNT(*) FROM Task WHERE completed = 1) AS completedTasks, " +
        "(SELECT COUNT(*) FROM Task WHERE completed = 1 AND due_date >= ?) AS normalCompletedTasks, " +
        "(SELECT COUNT(*) FROM Task WHERE completed = 1 AND due_date < ?) AS delayedCompletedTasks, " + 
        "(SELECT COUNT(*) FROM Task WHERE completed = 0 AND due_date < ?) AS delayedTasks, " + 
        "(SELECT COUNT(*) FROM Task WHERE completed = 0) AS availableTasks, " + 
        "(SELECT COUNT(*) FROM Task WHERE completed = 0 AND due_date = ?) AS todayToCompleteTasks";

        conn.query(query, [todaysDate, todaysDate, todaysDate, todaysDate], function(err, result, fields) {
            if (err) throw err;

            var resultJson = {};

            if (result != "") {
                resultJson = {
                    code: 200,
                    message: "Report successfully created.",
                    data: result
                }
            }
            else {
                resultJson = {
                    code: 400,
                    message: "Unable to create Report."
                }
            }
            res.send(resultJson);
            conn.release();
        });
    });
});

app.get('/reports/habits', (req, res) => {
    let real_time = req.query.real_time;
    let todaysDate = Date();

    taskPool.getConnection(function (err, conn) {
        var query = "SELECT " + 
        "(SELECT COUNT(*) FROM Habit WHERE score > 50) AS blueHabits, " +
        "(SELECT COUNT(*) FROM Habit WHERE score >= 40 AND score <= 50) AS greenHabits, " +
        "(SELECT COUNT(*) FROM Habit WHERE score >= 10 AND score < 40) AS yellowHabits, " + 
        "(SELECT COUNT(*) FROM Habit WHERE score >= 0 AND score < 10) AS orangeHabits, " + 
        "(SELECT COUNT(*) FROM Habit WHERE score < 0) AS redHabits"; 

        conn.query(query, [todaysDate, todaysDate, todaysDate, todaysDate], function(err, result, fields) {
            if (err) throw err;

            var resultJson = {};

            if (result != "") {
                resultJson = {
                    code: 200,
                    message: "Report successfully created.",
                    data: result
                }
            }
            else {
                resultJson = {
                    code: 400,
                    message: "Unable to create Report."
                }
            }
            res.send(resultJson);
            conn.release();
        });
    });
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