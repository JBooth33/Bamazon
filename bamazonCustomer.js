var inquirer = require('inquirer');
var mysql = require('mysql');

//create connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root1234",
    database: "bamazonDB"
});

//handle connection to server
connection.connect(function(err) {
    if (err) throw err;
    console.log("Success");
    
});