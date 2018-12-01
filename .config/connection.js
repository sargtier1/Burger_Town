const mysql = require('mysql');

const connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'Sammyarg1!',
    database: 'burgers_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connection ID: ' + connection.threadId);
});

module.exports = connection;