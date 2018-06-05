var inquirer = require('inquirer');
var mysql = require('mysql');
var cTable = require('console.table');
var table;

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


function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        var productTable = [];
        for (var i = 0; i < res.length; i++) {
            productTable[i] = 
            {
                ID: res[i].item_id,
                Product: res[i].product_name,
                Department: res[i].department_name,
                Price: res[i].price,
                Stock_Quantity: res[i].stock_quantity
            };
        }
        console.table('Product Inventory', productTable);
           
    })
}


viewProducts();