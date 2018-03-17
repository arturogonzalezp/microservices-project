const express = require('express');
const bodyParser = require('body-parser');
const db = require('./utils/db-manager.js');
const ip = require('ip');
const app = express();
const port = 4001;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/register', (req, res) => {
    let {email, password, name} = req.body;
    if(db.add(email,password,name)){
        res.send('User registered');
    }else{
        res.status(400);
        res.send(`User already registered with the email ${email}`);
    }
});

app.post('*', (req, res) => {
    let {email, password} = req.body;
    var user = db.get(email);
    if(user){
        if(user.password == password){
            res.send(user);
        }else{
            res.status(400);
            res.send('Password incorrect');
        }
    }else{
        res.status(400);
        res.send(`The email ${email} is not registered`);
    }
});

app.delete('/:email', (req, res) => {
    let {email} = req.params;
    if(db.delete(email)){
        res.send('User deleted');
    }else{
        res.status(400);
        res.send(`User with the email ${email} doesn't exist`);
    }
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
    let {email} = req.params;
    var user = db.get(email);
    if(user){
        res.send({
            email: user.email,
            name: user.name
        });
    }else{
        res.status(400);
        res.send(`The email ${email} is not registered`);
    }
});

app.get('*', (req, res) => {
    res.send('Accounts Microservice v1.0.0');
});

app.listen(port, () => {
    db.initialize();
    console.log(`Accounts microservice listening on ${ip.address()}:${port}!`);
});