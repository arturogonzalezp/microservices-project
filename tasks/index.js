var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

const port = 4003;

var pool = mysql.createPool({
	host: "arturogp.com",
	user: "complessi",
	password: "c1029384756",
	database: "complessi"
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/user/:email/task', (req, res) => {
    let email = req.params.email;
    let task = req.body;

    pool.getConnection(function (err, conn) {
        var query = "INSERT INTO task SET ?";
        var taskPost = {
            title: task.title,
            description: task.description,
            due_date: task.dueDate,
            reminder: task.reminder
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


app.get('/user/:email/task', (req, res) => {
    let email = req.params.email;

    pool.getConnection(function (err, conn) {
        var query = "SELECT * FROM task WHERE email = ?";
        
        conn.query(query, [email], function(err, result, fields) {
            if (err) throw err;

            var resultJson = {};

            if (result != "") {
                resultJson = {
                    code: 200,
                    message: "The task was successfully added",
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

app.delete('/task/:id', (req, res) => {
    let taskIdToRemove = req.params.id;

    pool.getConnection(function (err, conn) {
        var query = "DELETE FROM task WHERE id = ?";
        
        conn.query(query, [taskIdToRemove], function(err, result, fields) {
            if (err) throw err;

            var resultJson = {};

            if (result != "") {
                resultJson = {
                    code: 200,
                    message: "The task with ID " + taskIdToRemove + " has been successfully deleted.",
                    data: result
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

app.put('/task/:id', (req, res) => {
    let taskIdToRemove = req.params.id;
    let task = req.body;

    pool.getConnection(function (err, conn) {
        var query = "UPDATE task SET title = ?, description = ?, due_date = ?, reminder = ? WHERE id = ?";
        
        conn.query(query, [task.title, task.description, task.dueDate, task.reminder, taskIdToRemove], function(err, result, fields) {
            if (err) throw err;

            var resultJson = {};

            if (result != "") {
                resultJson = {
                    code: 200,
                    message: "The task with ID " + taskIdToRemove + " has been successfully updated.",
                    data: result
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

app.get('/task/:id', (req, res) => {
    let taskId = req.params.id;

    pool.getConnection(function (err, conn) {
        var query = "SELECT * FROM task WHERE id = ?";
        
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
                    message: "There is no task with ID " + taskIdToRemove
                }
            }
            res.send(resultJson);
            conn.release();
        });
    });
});

app.get('*', (req, res) => {
    res.send('Reports MicroService v1.0.0');
});

app.listen(port);
console.log('Reports MicroService Listening on port ' + port + '...');