const mysql = require('mysql');

var pool = mysql.createPool({
	host: "arturogp.com",
	user: "microtasks",
	password: "micro1029384756",
	database: "microservices-tasks"
});

module.exports = {
    getTaskReportAdmin: (todaysDate, callback) => {
        pool.getConnection(function (err, conn) {
            var query = "SELECT " + 
            "(SELECT COUNT(*) FROM Task WHERE completed = 1) AS completedTasks, " +
            "(SELECT COUNT(*) FROM Task WHERE completed = 1 AND due_date >= ?) AS normalCompletedTasks, " +
            "(SELECT COUNT(*) FROM Task WHERE completed = 1 AND due_date < ?) AS delayedCompletedTasks, " + 
            "(SELECT COUNT(*) FROM Task WHERE completed = 0 AND due_date < ?) AS delayedTasks, " + 
            "(SELECT COUNT(*) FROM Task WHERE completed = 0) AS availableTasks, " + 
            "(SELECT COUNT(*) FROM Task WHERE completed = 0 AND due_date = ?) AS todayToCompleteTasks";
    
            conn.query(query, [todaysDate, todaysDate, todaysDate, todaysDate], function(err, result, fields) {
                if (err) {
                    return callback(err, false);
                }
    
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
                conn.release();
                return callback(resultJson, true);
            });
        });
    },
    getHabitsReportAdmin: (todaysDate, callback) => {
        pool.getConnection(function (err, conn) {
            var query = "SELECT " + 
            "(SELECT COUNT(*) FROM Habit WHERE score > 50) AS blueHabits, " +
            "(SELECT COUNT(*) FROM Habit WHERE score >= 40 AND score <= 50) AS greenHabits, " +
            "(SELECT COUNT(*) FROM Habit WHERE score >= 10 AND score < 40) AS yellowHabits, " + 
            "(SELECT COUNT(*) FROM Habit WHERE score >= 0 AND score < 10) AS orangeHabits, " + 
            "(SELECT COUNT(*) FROM Habit WHERE score < 0) AS redHabits"; 
    
            conn.query(query, [todaysDate, todaysDate, todaysDate, todaysDate], function(err, result, fields) {
                if (err) {
                    return callback(err, false);
                }
    
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
                conn.release();
                return callback(resultJson, true);
            });
        });
    },
    getTaskReportUser: (userId, todaysDate, callback) => {
        pool.getConnection(function (err, conn) {
            var delayedTasksQuery = "SELECT title FROM Task WHERE due_date < ? AND completed = 0 AND user_id = ?";
    
            conn.query(delayedTasksQuery, [todaysDate, userId], function(delayedTasksErr, delayedTasksResult, fields) {
                if (delayedTasksErr) {
                    return callback(delayedTasksErr, false);
                }
    
                var resultJson = {};
    
                if (delayedTasksErr == null) {
                    var todaysTasksQuery = "SELECT title FROM Task WHERE due_date = ? AND completed = 0 AND user_id = ?";
                    
                    conn.query(todaysTasksQuery, [todaysDate, userId], function(todaysTasksErr, todaysTasksResult, fields2) {
                        if (todaysTasksErr) {
                            if (todaysTasksErr) {
                                return callback(todaysTasksErr, false);
                            }
                        }
                    
                        if (todaysTasksErr == null) {
                            resultJson = {
                                code: 200,
                                message: "Report successfully created.",
                                data: {
                                    todaysTasks: todaysTasksResult,
                                    delayedTasks: delayedTasksResult
                                }
                            }
                        }
                        conn.release();
                        return callback(resultJson, true);
                    });
                }
                else {
                    resultJson = {
                        code: 400,
                        message: "Unable to create Report."
                    }
                    conn.release();
                    return callback(resultJson, false);
                }
            });
        });
    },
    getHabitsReportUser: (userId, callback) => {
        pool.getConnection(function (err, conn) {
            var goodHabitsQuery = "SELECT title FROM Habit WHERE score > 50 AND user_email = ?";
    
            conn.query(goodHabitsQuery, userId, function(goodHabitsErr, goodHabitsResult, fields) {
                if (goodHabitsErr) {
                    return callback(goodHabitsErr, false);
                }
    
                var resultJson = {};
    
                if (goodHabitsErr == null) {
                    var badHabitsQuery = "SELECT title FROM Habit WHERE score < 0 AND user_email = ?";
                    
                    conn.query(badHabitsQuery, userId, function(badHabitsErr, badHabitsResult, fields2) {
                        if (badHabitsErr) {
                            return callback(badHabitsErr, false);
                        }
                    
                        if (badHabitsErr == null) {
                            resultJson = {
                                code: 200,
                                message: "Report successfully created.",
                                data: {
                                    goodHabits: goodHabitsResult,
                                    badHabits: badHabitsResult
                                }
                            }
                        }
                        conn.release();
                        return callback(resultJson, true);
                    });
                }
                else {
                    resultJson = {
                        code: 400,
                        message: "Unable to create Report."
                    }
                    conn.release();
                    return callback(resultJson, false);
                }
            });
        });
    }
};