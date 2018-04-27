const mysql = require('mysql');

var pool = mysql.createPool({
	host: "arturogp.com",
	user: "microtasks",
	password: "micro1029384756",
	database: "microservices-tasks"
});

module.exports = {
    getAllUserHabits: (email, callback) => {
        console.log("getting all users habits..");
        pool.getConnection(function (err, conn) {
            var query = "SELECT * FROM Habit WHERE user_email = ?";
            
            conn.query(query, email, function(err, result, fields) {

                var resultJson = {};
                var isSuccess;

                if (err) {
                    resultJson = {
                        code: 500,
                        message: "Database connection/query error"
                    }
                    isSuccess = false;
                }

                if (result != "") {
                    resultJson = {
                        code: 400,
                        data: result
                    }
                    isSuccess = true;
                }

                conn.release();
                return callback(resultJson, isSuccess);
            });
        });
    },
    addHabit: (email, habit, callback) => {
        console.log("adding habit...");
        pool.getConnection(function (err, conn) {
            var query = "INSERT INTO Habit SET ?";
            var habitPost = {
                user_email: email,
                title: habit.title,
                type: habit.type,
                difficulty: habit.difficulty
            };

            var resultJson = {};

            conn.query(query, habitPost, function(err, result, fields) {

                var resultJson = {};
                var isSuccess;

                if (err) {
                    resultJson = {
                        code: 500,
                        message: "Database connection/query error. Title, type and difficulty parameters can't be null!"
                    }
                    isSuccess = false;
                }

                if (result != "") {
                    resultJson = {
                        code: 200,
                        message: "The habit was successfully added!"
                    }
                    isSuccess = true;
                }

                conn.release();
                return callback(resultJson, isSuccess);
            });
        });
    },
    getTaskWithId: (email, id, callback) => {
        console.log("get habit by id...");
        pool.getConnection(function (err, conn) {
            var query = "SELECT * FROM Habit WHERE id = ? AND user_email = ?";
            
            conn.query(query, [id, email], function(err, result, fields) {

                var resultJson = {};
                var isSuccess;

                if (err) {
                    resultJson = {
                        code: 500,
                        message: "Database connection/query error"
                    }
                    isSuccess = false;
                } else if (result != "") {
                    resultJson = {
                        code: 200,
                        data: result
                    }
                    isSuccess = true;
                } else {
                    resultJson = {
                        code: 400,
                        message: "There is no habit with ID " + id + " assigned to the user " + email
                    }
                    isSuccess = false;
                }
                conn.release();
                return callback(resultJson, isSuccess);
            });
        });
    },
    updateHabit: (email, id, habit, callback) => {
        console.log("updating habit...");
        console.log(habit.type)
        pool.getConnection(function (err, conn) {
            var query = "UPDATE Habit SET title = ?, type = ?, difficulty = ?, score = ? WHERE id = ? AND user_email = ?";

            conn.query(query, [habit.title, habit.type, habit.difficulty, habit.score, id, email], function(err, result, fields) {

                var resultJson = {};
                var isSuccess;

                if (err) {
                    resultJson = {
                        code: 500,
                        message: "Database connection/query error"
                    }
                    isSuccess = false;
                } else if (result.affectedRows == 1) {
                    resultJson = {
                        code: 200,
                        message: "The habit with ID " + id + " has been successfully updated!"
                    }
                    isSuccess = true;
                } else {
                    resultJson = {
                        code: 400,
                        message: "There is no habit with ID " + id + " assigned to the user " + email
                    }
                    isSuccess = false;
                }
                conn.release();
                return callback(resultJson, isSuccess);
            });
        });
    },
    deleteHabit: (email, id, callback) => {
        console.log("deleting habit by id...");
        pool.getConnection(function (err, conn) {
            var query = "DELETE FROM Habit WHERE id = ? AND user_email = ?";
            
            conn.query(query, [id, email], function(err, result, fields) {

                var resultJson = {};
                var isSuccess;

                if (err) {
                    resultJson = {
                        code: 500,
                        message: "Database connection/query error"
                    }
                    isSuccess = false;
                } else if (result.affectedRows == 1) {
                    resultJson = {
                        code: 200,
                        message: "The habit with ID " + id + " has been successfully deleted!"
                    }
                    isSuccess = true;
                } else {
                    resultJson = {
                        code: 400,
                        message: "There is no habit with ID " + id + " assigned to the user " + email
                    }
                    isSuccess = false;
                }
                conn.release();
                return callback(resultJson, isSuccess);
            });
        });
    },
    addScore: (email, id, callback) => {
        console.log("updating score...");
        pool.getConnection(function (err, conn) {
            var query = "SELECT score, difficulty FROM Habit WHERE id = ? AND user_email = ?";

            conn.query(query, [id, email], function(err, result, fields) {

                var resultJson = {};
                var isSuccess;

                console.log(result)

                if (err) {
                    resultJson = {
                        code: 500,
                        message: "Database connection/query error"
                    }
                    isSuccess = false;
                    conn.release();
                    return callback(resultJson, isSuccess);
                } else if (result != "") {
                    var score = result[0].score;
                    var difficulty = result[0].difficulty;

                    if (difficulty == "Easy") {
                        if (score >= 40 && score < 50) {
                            score += 1;
                        } else if (score >= 50) {
                            score += 1;
                        } else {
                            score += 2;
                        }
                    } else if (difficulty == "Medium") {
                        if (score >= 40 && score < 50) {
                            score += 1.5;
                        } else if (score >= 50) {
                            score += 1.0;
                        } else {
                            score += 3;
                        }
                    } else if (difficulty == "Hard") {
                        if (score >= 40 && score < 50) {
                            score += 2.5;
                        } else if (score >= 50) {
                            score += 1;
                        } else {
                            score += 5;
                        }
                    }

                    var query  = 'UPDATE Habit SET score = ? WHERE id = ? AND user_email = ?';
                    conn.query(query, [score, id, email], function(err, result, fields) {

                        if (err) {
                            resultJson = {
                                code: 500,
                                message: "Database connection/query error"
                            }
                            isSuccess = false;
                        } else if (result.affectedRows == 1) {
                            resultJson = {
                                code: 200,
                                message: "The score of the habit with ID " + id + " has been successfully upvoted!", "score": score,
                                score: score
                            }
                            isSuccess = true;
                        }
                        conn.release();
                        return callback(resultJson, isSuccess);
                    });
                } else {
                    resultJson = {
                        code: 400,
                        message: "There is no habit with ID " + id + " assigned to the user " + email
                    }
                    isSuccess = false;
                    conn.release();
                    return callback(resultJson, isSuccess);
                }

            });
        });
    },
    subtractScore: (email, id, callback) => {
        console.log("subtract score...");
        pool.getConnection(function (err, conn) {
            var query = "SELECT score, difficulty FROM Habit WHERE id = ? AND user_email = ?";

            conn.query(query, [id, email], function(err, result, fields) {

                var resultJson = {};
                var isSuccess;

                console.log(result)

                if (err) {
                    resultJson = {
                        code: 500,
                        message: "Database connection/query error"
                    }
                    isSuccess = false;
                    conn.release();
                    return callback(resultJson, isSuccess);
                } else if (result != "") {
                    var score = result[0].score;
                    var difficulty = result[0].difficulty;

            if (difficulty == "Easy") {
                if (score >= 0 && score < 10) {
                    score -= 3;
                } else if (score < 0) {
                    score -= 4;
                } else {
                    score -= 2;
                }
            } else if (difficulty == "Medium") {
                if (score >= 0 && score < 10) {
                    score -= 4.5;
                } else if (score < 0) {
                    score -= 6;
                } else {
                    score -= 3;
                }
            } else if (difficulty == "Hard") {
                if (score >= 0 && score < 10) {
                    score -= 7.5;
                } else if (score < 0) {
                    score -= 10;
                } else {
                    score -= 5;
                }
            }

                    var query  = 'UPDATE Habit SET score = ? WHERE id = ? AND user_email = ?';
                    conn.query(query, [score, id, email], function(err, result, fields) {

                        if (err) {
                            resultJson = {
                                code: 500,
                                message: "Database connection/query error"
                            }
                            isSuccess = false;
                        } else if (result.affectedRows == 1) {
                            resultJson = {
                                code: 200,
                                message: "The score of the habit with ID " + id + " has been successfully upvoted!", "score": score,
                                score: score
                            }
                            isSuccess = true;
                        }
                        conn.release();
                        return callback(resultJson, isSuccess);
                    });
                } else {
                    resultJson = {
                        code: 400,
                        message: "There is no habit with ID " + id + " assigned to the user " + email
                    }
                    isSuccess = false;
                    conn.release();
                    return callback(resultJson, isSuccess);
                }

            });
        });
    },
    getAllHabits: (email, id, callback) => {
        console.log("get all habits ...");
        pool.getConnection(function (err, conn) {
            var query = "SELECT * FROM Habit";
            
            conn.query(query, [id, email], function(err, result, fields) {

                var resultJson = {};
                var isSuccess;

                if (err) {
                    resultJson = {
                        code: 500,
                        message: "Database connection/query error"
                    }
                    isSuccess = false;
                } else if (result != "") {
                    resultJson = {
                        code: 200,
                        data: result
                    }
                    isSuccess = true;
                }
                conn.release();
                return callback(resultJson, isSuccess);
            });
        });
    },
}