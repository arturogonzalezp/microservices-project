var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

const port = 4003;

var pool = mysql.createPool({
	host: "arturogp.com",
	user: "microtasks",
	password: "micro1029384756",
	database: "microservices-tasks"
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// DONE.
app.post('/user/:email/task', (req, res) => {
    let email = req.params.email;
    let task = req.body;

    pool.getConnection(function (err, conn) {
        var query = "INSERT INTO Task SET ?";
        var taskPost = {
            user_id: email,
            title: task.title,
            description: task.description,
            due_date: task.dueDate,
            reminder_date: task.reminder
        };
        
        conn.query(query, taskPost, function(err, result, fields) {
            if (err) throw err;

            var resultJson = {};

            if (result != "") {
                resultJson = {
                    code: 200,
                    message: "The task was successfully added"
                }
            }
            else {
                resultJson = {
                    code: 400,
                    message: "Unable to add task for user " + email
                }
            }
            res.send(resultJson);
            conn.release();
        });
    });
});

// DONE.
app.get('/user/:email/task', (req, res) => {
    let email = req.params.email;

    pool.getConnection(function (err, conn) {
        var query = "SELECT * FROM Task WHERE user_id = ?";
        
        conn.query(query, [email], function(err, result, fields) {
            if (err) throw err;

            var resultJson = {};

            if (result != "") {
                resultJson = {
                    code: 200,
                    message: "The tasks were successfully retrieved",
                    data: result
                }
            }
            else {
                resultJson = {
                    code: 400,
                    message: "There are no tasks for user " + email
                }
            }
            res.send(resultJson);
            conn.release();
        });
    });
});

// DONE.
app.delete('/task/:id', (req, res) => {
    let taskIdToRemove = req.params.id;

    pool.getConnection(function (err, conn) {
        var query = "DELETE FROM Task WHERE id = ?";
        
        conn.query(query, [taskIdToRemove], function(err, result, fields) {
            if (err) throw err;

            var resultJson = {};

            if (result != "" && result.affectedRows > 0) {
                resultJson = {
                    code: 200,
                    message: "The task with ID " + taskIdToRemove + " has been successfully deleted."
                }
            }
            else {
                resultJson = {
                    code: 400,
                    message: "There is no task with ID " + taskIdToRemove
                }
            }
            res.send(resultJson);
            conn.release();
        });
    });
});

// DONE.
app.put('/task/:id', (req, res) => {
    let taskIdToRemove = req.params.id;
    let task = req.body;

    pool.getConnection(function (err, conn) {
        var query = "UPDATE Task SET title = ?, description = ?, due_date = ?, reminder_date = ? WHERE id = ?";
        
        conn.query(query, [task.title, task.description, task.dueDate, task.reminder, taskIdToRemove], function(err, result, fields) {
            if (err) throw err;

            var resultJson = {};

            if (result != "" && result.affectedRows > 0) {
                resultJson = {
                    code: 200,
                    message: "The task with ID " + taskIdToRemove + " has been successfully updated."
                }
            }
            else {
                resultJson = {
                    code: 400,
                    message: "There is no task with ID " + taskIdToRemove
                }
            }
            res.send(resultJson);
            conn.release();
        });
    });
});

// DONE.
app.get('/task/:id', (req, res) => {
    let taskId = req.params.id;

    pool.getConnection(function (err, conn) {
        var query = "SELECT * FROM Task WHERE id = ?";
        
        conn.query(query, [taskId], function(err, result, fields) {
            if (err) throw err;

            var resultJson = {};

            if (result != "") {
                resultJson = {
                    code: 200,
                    message: "Task successfully retrieved.",
                    data: result
                }
            }
            else {
                resultJson = {
                    code: 400,
                    message: "There is no task with ID " + taskId
                }
            }
            res.send(resultJson);
            conn.release();
        });
    });
});

app.get('/discover', (req,res) => {
    res.send('Tasks');
});

app.get('*', (req, res) => {
    res.send('Tasks MicroService v1.0.0');
});

app.listen(port);
console.log('Tasks MicroService Listening on port ' + port + '...');