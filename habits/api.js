var router = require('express').Router();
var con = require('./config/db-connection');

// Service Discovery

router.get('/discover', (req,res) => {
    res.send('habits');
});

// Retrieve all user's habits

router.get('/user/:email/habits', function(req, res){
	var sql = 'SELECT * FROM Habit WHERE user_email = ?';
	var email = [req.params.email];
	con.query(sql, email, function(err, rows){
		if(err){
			res.status(500);
			res.json({"message": "Database connection/query error"});
		} else {
			res.json({"habits" : rows});
		}
	});
})

// Create a new user habit

router.post('/user/:email/habits', function(req, res) {
	var sql  = 'INSERT INTO Habit (user_email, title, type, difficulty) VALUES (?, ?, ?, ?)';
	var email = [req.params.email];
	var body = [email, req.body.title, req.body.type, req.body.difficulty];
	con.query(sql, body, function(err){
		if(err){
			res.status(500);
			res.json({"message": "Database connection/query error. Title, type and difficulty parameters can't be null!"})
		} else {
			res.json({"message": "The habit was successfully added!"})
		}
	});
})

// Retrieves user habit by ID

router.get('/user/:email/habits/:id', function(req, res){
	var sql = 'SELECT * FROM Habit WHERE id = ? AND user_email = ?';
	var body = [req.params.id, req.params.email];
	con.query(sql, body, function(err, rows){
		if(err){
			res.status(500);
			res.json({"message": "Database connection/query error"})
		} else if (rows.length == 0) {
			res.status(400);
			res.json({"message": "There is no habit with ID " + req.params.id + " assigned to the user " + req.params.email});
		} else {
			res.json(rows)
		}
	});
})

// Updates user habit by ID

router.put('/user/:email/habits/:id', function(req, res){
	var sql  = 'UPDATE Habit SET title = ?, type = ?, difficulty = ?, score = ? WHERE id = ? AND user_email = ?';
	var body = [req.body.title, req.body.type, req.body.difficulty, req.body.score, req.params.id, req.params.email];
	con.query(sql, body, function(err, rows){
		if(err){
			res.status(500);
			res.json({"message": "Database connection/query error"});
		} else if (rows.affectedRows == 0) {
			res.status(400);
			res.json({"message": "There is no habit with ID " + req.params.id + " assigned to the user " + req.params.email});
		} else {
			res.json({"message": "The habit with ID " + req.params.id + " has been successfully updated!"});
		}
	});
})

// Deletes user habit by ID

router.delete('/user/:email/habits/:id', function(req, res){
	var sql = 'DELETE FROM Habit WHERE id = ? AND user_email = ?';
	var body = [req.params.id, req.params.email];
	con.query(sql, body, function(err, rows){
		if(err){
			res.status(500);
			res.json({"message": "Database connection/query error"});
		} else if (rows.affectedRows == 0) {
			res.status(400);
			res.json({"message": "There is no habit with ID " + req.params.id + " assigned to the user " + req.params.email});
		} else {
			res.json({"message": "The habit with ID " + req.params.id + " has been successfully deleted!"});
		}
	});
})

// Upvote (+) score to user’s habit

router.patch('/user/:email/habits/:id/score/add', function(req, res){
	var sql = 'SELECT score, difficulty FROM Habit WHERE id = ? AND user_email = ?';
	var body = [req.params.id, req.params.email];
	con.query(sql, body, function(err, rows){
		if(err){
			res.status(500);
			res.json({"message": "Database connection/query error"})
		} else {
			var score = rows[0].score;
			var difficulty = rows[0].difficulty;
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

			var sql  = 'UPDATE Habit SET score = ? WHERE id = ? AND user_email = ?';
			var body = [score, req.params.id, req.params.email];
			con.query(sql, body, function(err, rows){
				if(err){
					res.status(500);
					res.json({"message": "Database connection/query error"});
				} else if (rows.affectedRows == 0) {
					res.status(400);
					res.json({"message": "There is no habit with ID " + req.params.id + " assigned to the user " + req.params.email});
				} else {
					res.json({"message": "The score of the habit with ID " + req.params.id + " has been successfully upvoted!", "score": score});
				}
			});
		}
	});
})

// Downvote (-) score to user’s habit

router.patch('/user/:email/habits/:id/score/subtract', function(req, res){
	var sql = 'SELECT score, difficulty FROM Habit WHERE id = ? AND user_email = ?';
	var body = [req.params.id, req.params.email];
	con.query(sql, body, function(err, rows){
		if(err){
			res.status(500);
			res.json({"message": "Database connection/query error"})
		} else {
			var score = rows[0].score;
			var difficulty = rows[0].difficulty;
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

			var sql  = 'UPDATE Habit SET score = ? WHERE id = ? AND user_email = ?';
			var body = [score, req.params.id, req.params.email];
			con.query(sql, body, function(err, rows){
				if(err){
					res.status(500);
					res.json({"message": "Database connection/query error"});
				} else if (rows.affectedRows == 0) {
					es.status(400);
					res.json({"message": "There is no habit with ID " + req.params.id + " assigned to the user " + req.params.email});
				} else {
					res.json({"message": "The score of the habit with ID " + req.params.id + " has been successfully downvoted!", "score": score});
				}
			});
		}
	});
})

// Admin - Retrieves all the list of habits

router.get('/user/habits', function(req, res) {
	var sql = 'SELECT * FROM Habit';
	con.query(sql, function(err, rows){
		if(err){
			res.status(500);
			res.json({"message": "Database connection/query error"})
		} else {
			res.json({"habits" : rows});
		}
	});
})

// Admin - Delete all user habits

router.delete('/user/:email/habits', function(req, res){
	var sql = 'DELETE FROM Habit WHERE user_email = ?';
	var email = [req.params.email];
	con.query(sql, email, function(err, rows){
		if(err){
			res.status(500);
			res.json({"message": "Database connection/query error"});
		} else {
			res.json({"message": "All the habits of the user " + email + " have been successfully deleted!"});
		}
	});
})

module.exports = router