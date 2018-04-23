var mysql = require('mysql');
var con   = mysql.createPool({
	host: 'arturogp.com',
	user: 'microtasks',
    password: 'micro1029384756',
    database: 'microservices-tasks'
});

con.getConnection(function(err, connection) {
  // Use the connection
  connection.query('SELECT * FROM Habit', function (error, results, fields) {
    // And done with the connection.
    connection.release();

    // Handle error after the release.
    if (error) throw error;

    // Don't use the connection here, it has been returned to the pool.
  });
});

module.exports = con;