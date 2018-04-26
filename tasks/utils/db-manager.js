const mysql = require('mysql');

var pool = mysql.createPool({
	host: "arturogp.com",
	user: "microtasks",
	password: "micro1029384756",
	database: "microservices-tasks"
});

module.exports = {
    addTask: (email,task, callback) => {
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
                if (err) {
                    throw err;
                    return callback(err, false);
                }
    
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
                conn.release();
                return callback(resultJson, true);
            });
        });
    },
    getAllTasksForUserId: (userId, callback) => {
        pool.getConnection(function (err, conn) {
            var query = "SELECT * FROM Task WHERE user_id = ?";
            
            conn.query(query, [userId], function(err, result, fields) {
                if (err) {
                    return callback(err, false);
                }
    
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
                        message: "There are no tasks for user " + userId
                    }
                }
                conn.release();
                return callback(resultJson, true);
            });
        });
    },
    deleteTaskWithId: (taskId, callback) => {
        pool.getConnection(function (err, conn) {
            var query = "DELETE FROM Task WHERE id = ?";
            
            conn.query(query, [taskId], function(err, result, fields) {
                if (err) {
                    return callback(err, false);
                }
    
                var resultJson = {};
    
                if (result != "" && result.affectedRows > 0) {
                    resultJson = {
                        code: 200,
                        message: "The task with ID " + taskId + " has been successfully deleted."
                    }
                }
                else {
                    resultJson = {
                        code: 400,
                        message: "There is no task with ID " + taskId
                    }
                }
                conn.release();
                return callback(resultJson, true);
            });
        });
    },
    updateTask: (taskId, task, callback) => {
        pool.getConnection(function (err, conn) {
            var query = "UPDATE Task SET title = ?, description = ?, due_date = ?, reminder_date = ? WHERE id = ?";
            
            conn.query(query, [task.title, task.description, task.dueDate, task.reminder, taskId], function(err, result, fields) {
                if (err) {
                    return callback(err, false);   
                }
    
                var resultJson = {};
    
                if (result != "" && result.affectedRows > 0) {
                    resultJson = {
                        code: 200,
                        message: "The task with ID " + taskId + " has been successfully updated."
                    }
                }
                else {
                    resultJson = {
                        code: 400,
                        message: "There is no task with ID " + taskId
                    }
                }
                conn.release();
                return callback(resultJson, true);
            });
        });
    },
    getTaskWithId: (taskId, callback) => {
        pool.getConnection(function (err, conn) {
            var query = "SELECT * FROM Task WHERE id = ?";
            
            conn.query(query, [taskId], function(err, result, fields) {
                if (err) {
                    return callback(err, false);
                }
    
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
                conn.release();
                return callback(resultJson, true);
            });
        });
    }
};