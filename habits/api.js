var router = require('express').Router();
var con = require('./config/db-connection');

// Retrieves all the list of habits

router.get('/', function(req, res) {
	var sql = 'SELECT * FROM habits';
	con.query(sql, function(err, rows){
		if(err){
			res.status(400);
			res.json({"Message": "Database connection/query error"})
		} else {
			res.json({"habits" : rows});
		}
	});
})

// Retrieves a specific habit

router.get('/:id', function(req, res){
	var sql = 'SELECT * FROM habits WHERE id = ?';
	var id = [req.params.id];
	con.query(sql, id, function(err, rows){
		if(err){
			res.status(400);
			res.json({"Message": "Database connection/query error"})
		} else if (rows.length == 0) {
			res.status(400);
			res.json({"Message": "There is no habit with ID: " + id});
		} else {
			res.json(rows)
		}
	});
})

// Update habit by ID

router.put('/:id', function(req, res){
	var id = [req.params.id];
	var sql  = 'UPDATE habits SET user_email = ?, title = ?, type = ?, difficulty = ?, score = ? WHERE id = "' + id + '"';
	var body = [req.body.user_email, req.body.title, req.body.type, req.body.difficulty, req.body.score];
	con.query(sql, body, function(err, rows){
		if(err){
			res.status(400);
			res.json({"Message": "Database connection/query error"});
		} else if (rows.affectedRows == 0) {
			res.status(400);
			res.json({"Message": "There is no habit with ID: " + id});
		} else {
			res.json({"Message": "The habit with ID " + id + " has been successfully updated"});
		}
	});
})

// Delete habit by ID

router.delete('/:id', function(req, res){
	var sql = 'DELETE FROM habits WHERE id = ?';
	var id = [req.params.id];
	con.query(sql, id, function(err, rows){
		if(err){
			res.status(400);
			res.json({"Message": "Database connection/query error"});
		} else if (rows.affectedRows == 0) {
			res.status(400);
			res.json({"Message": "There is no habit with ID: " + id});
		} else {
			res.json({"Message": "The habit with ID " + id + " has been successfully deleted"});
		}
	});
})

// Retrieves habit by user

router.get('/user/:email', function(req, res){
	var sql = 'SELECT * FROM habits WHERE user_email = ?';
	var email = [req.params.email];
	con.query(sql, email, function(err, rows){
		if(err){
			res.status(400);
			res.json({"Message": "Database connection/query error"});
		} else if (rows.length == 0) {
			res.status(400);
			res.json({ "Message": "There are no habits for the user: " + email});
		} else {
			res.json({"habits" : rows});
		}
	});
})

// Creates a new user habit

router.post('/user/:email', function(req, res) {
	var sql  = 'INSERT INTO habits (user_email, title, type, difficulty) VALUES (?, ?, ?, ?)';
	var email = [req.params.email];
	var body = [email, req.body.title, req.body.type, req.body.difficulty];
	con.query(sql, body, function(err){
		if(err){
			res.status(400);
			res.json({"Message": "Database connection/query error"});
		} else {
			res.json({"Message": "The habit was successfully added"})
		}
	});
})

// Delete all user habits

router.delete('/user/:email', function(req, res){
	var sql = 'DELETE FROM habits WHERE user_email = ?';
	var email = [req.params.email];
	con.query(sql, email, function(err, rows){
		if(err){
			res.status(400);
			res.json({"Message": "Database connection/query error"});
		} else if (rows.affectedRows == 0) {
			res.status(400);
			res.json({ "Message": "There are no habits for the user: " + email});
		} else {
			res.json({"Message": "All the habits of the user " + email + " have been successfully deleted"});
		}
	});
})

module.exports = router