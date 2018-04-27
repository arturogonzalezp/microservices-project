var router = require('express').Router();
const db = require('./utils/db-manager.js');

// Service Discovery

router.get('/discover', (req,res) => {
	res.send('habits');
});

// Retrieve all user's habits

router.get('/user/:email/habits', function(req, res){
	let email = req.params.email;

	db.getAllUserHabits(email, function(result, isSuccess) {
		if (!isSuccess) {
			res.status(result.code);
			res.json({"message": result.message})
		} else {
			res.json({"habits": result.data})
		}
	});
})

// Create a new user habit

router.post('/user/:email/habits', function(req, res) {
	let email = req.params.email;
	let habit = req.body;

	db.addHabit(email, habit, function(result, isSuccess) {
		if (!isSuccess) {
			res.status(result.code);
			res.json({"message": result.message})
		} else {
			res.json({"message": result.message})
		}
	});
})

// Retrieves user habit by ID

router.get('/user/:email/habits/:id', function(req, res){
	let email = req.params.email;
	let id = req.params.id;

	db.getTaskWithId(email, id, function(result, isSuccess) {
		if (!isSuccess) {
			res.status(result.code);
			res.json({"message": result.message})
		} else {
			res.json(result.data)
		}
	});
})

// Updates user habit by ID

router.put('/user/:email/habits/:id', function(req, res){
	let email = req.params.email;
	let id = req.params.id;
	let habit = req.body;

	db.updateHabit(email, id, habit, function(result, isSuccess) {
		if (!isSuccess) {
			res.status(result.code);
			res.json({"message": result.message})
		} else {
			res.json({"message": result.message})
		}
	});
})

// Deletes user habit by ID

router.delete('/user/:email/habits/:id', function(req, res){
	let email = req.params.email;
	let id = req.params.id;

	db.deleteHabit(email, id, function(result, isSuccess) {
		if (!isSuccess) {
			res.status(result.code);
			res.json({"message": result.message})
		} else {
			res.json({"message": result.message})
		}
	});
})

// Upvote (+) score to user’s habit

router.patch('/user/:email/habits/:id/score/add', function(req, res){
	let email = req.params.email;
	let id = req.params.id;

	db.addScore(email, id, function(result, isSuccess) {
		if (!isSuccess) {
			console.log("result code" + result.code)
			res.status(result.code);
			res.json({"message": result.message})
		} else {
			console.log("aca")
			res.json({"message": result.message, "score": result.score})
		}
	});
})

// Downvote (-) score to user’s habit

router.patch('/user/:email/habits/:id/score/subtract', function(req, res){
		let email = req.params.email;
	let id = req.params.id;

	db.subtractScore(email, id, function(result, isSuccess) {
		if (!isSuccess) {
			console.log("result code" + result.code)
			res.status(result.code);
			res.json({"message": result.message})
		} else {
			console.log("aca")
			res.json({"message": result.message, "score": result.score})
		}
	});
})

// Admin - Retrieves all the list of habits

router.get('/user/habits', function(req, res) {

	db.getAllHabits(function(result, isSuccess) {
		if (!isSuccess) {
			res.status(result.code);
			res.json({"message": result.message})
		} else {
			res.json({"habits": result.data})
		}
	});
})

module.exports = router