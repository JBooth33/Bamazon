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
connection.connect(function (err) {
    if (err) throw err;
    console.log("Success");

});

function inventory() {
    inquirer.prompt([{
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "End Session"]
    }]).then(function(ans) {
        switch(ans.doTask) {
            case "View Products for Sale": viewProducts();
            break;
            case "View Low Inventory": viewLowInventory();
            break;
            case "Add to Inventory": addInventory();
            break;
            case "Add New Product": addNewProduct();
            break;
            case "End Session": console.log("Ending Session");
        }
    })
}