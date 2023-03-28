const mysql = require("mysql");

// Create DB Connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "lawadvisor_todo"
});


connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;