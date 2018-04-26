const express = require('express');
const bodyParser = require('body-parser');
const db = require('./utils/db-manager.js');
const ip = require('ip');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/swagger.json');
const app = express();
const port = 4001;
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, GET, DELETE, PATCH");
    next();
  });

app.post('/account', (req, res) => {
    let { email, password, name } = req.body;
    if (email && password && name) {
        if (db.add(email, password, name)) {
            res.send('User registered');
        } else {
            res.status(400);
            res.send(`User already registered with the email ${email}`);
        }
    } else {
        res.status(400);
        res.send('Incorrect parameters');
    }
});

app.post('/login', (req, res) => {
    let { email, password } = req.body;
    var user = db.get(email);
    if (user) {
        if (user.password == password) {
            res.send(user);
        } else {
            res.status(400);
            res.send('Password incorrect');
        }
    } else {
        res.status(400);
        res.send(`The email ${email} is not registered`);
    }
});

app.delete('/account/:email', (req, res) => {
    let { email } = req.params;
    if (db.delete(email)) {
        // Delete user data from other microservices missing
        res.send('User deleted');
    } else {
        res.status(400);
        res.send(`User with the email ${email} doesn't exist`);
    }
});

app.get('/discover', (req,res) => {
    res.send('accounts');
});
app.get('/accounts', (req, res) => {
    var returnArray = [];
    var usersMap = db.getAll();
    Object.keys(usersMap).forEach((user) => {
        returnArray.push({
            email: usersMap[user].email,
            name: usersMap[user].name
        });
    });
    res.send(JSON.stringify(returnArray));
});

app.get('/account/:email', (req, res) => {
    let { email } = req.params;
    var user = db.get(email);
    if (user) {
        res.send({
            email: user.email,
            name: user.name
        });
    } else {
        res.status(400);
        res.send(`The email ${email} is not registered`);
    }
});

app.get('*', (req, res) => {
    res.send('Accounts Microservice v1.0.0');
});

app.listen(port, () => {
    console.log(db.initialize());
    console.log(`Accounts microservice listening on ${ip.address()}:${port}!`);
});