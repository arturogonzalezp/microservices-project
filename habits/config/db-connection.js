var mysql = require('mysql');
var con   = mysql.createConnection({
   host: 'localhost',
    user: 'habits-user',
    password: '123456',
    database: 'habits'
});
module.exports = con;