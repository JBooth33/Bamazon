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
        name: "options",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "End Session"]
    }]).then(function (answer) {

        switch (answer.options) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
            case "End Session":
                console.log("Ending Session");
        }
    })
}

//function to show table of all inventory
function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        var productTable = [];
        for (var i = 0; i < res.length; i++) {
            productTable[i] = {
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
//function to display items with inventory count lower than 5
function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        console.log("There are less than 5 in stock of the following products");
        var lowInventoryTable = [];
        for (var i = 0; i < res.length; i++) {
            lowInventoryTable[i] = {
                ID: res[i].item_id,
                Product: res[i].product_name,
                Department: res[i].department_name,
                Price: res[i].price,
                Stock_Quantity: res[i].stock_quantity
            };
        }
        console.table('Low Inventory', lowInventoryTable);
    })
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        inquirer.prompt([{
                name: "product_name",
                type: "list",
                message: "Which product would you like to purchase?",
                choices: function () {
                    var choices = [];
                    for (var i = 0; i < res.length; i++) {
                        choices.push(res[i].item_id + ": " + res[i].product_name)
                    }
                    return choices
                }
            },

            {
                name: "product_quantity",
                type: "input",
                message: "How many would you like to purchase?",
                when: function (answers) {
                    return answers.product_name
                }
            }
        ]).then(function (answers) {

            var splitSelectedItem = answers.product_name.split(":");
            var selectedItem = splitSelectedItem[0];
            var productQuantity = parseInt(answers.product_quantity);

            connection.query("SELECT * FROM products WHERE ?", {
                item_id: selectedItem
            }, function (err, res) {
                if (err) throw err;
                itemQuantity = res[0].stock_quantity + productQuantity;
                addedItem = res[0].product_name;
                console.log("There are now " + itemQuantity + " " + addedItem + " in stock.");

                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: itemQuantity
                }, {
                    item_id: addedItem
                }], function (err, res) {
                    if (err) throw err;
                    var table = cTable.getTable(
                        {
                            Product: addedItem,
                            Stock_Quantity: itemQuantity
                        }
                    );
                    console.log(table);
                    additionalPurchase();
                })
            });

            

        });

    });

}

function additionalPurchase() {
    inquirer.prompt([{
        name: "reply",
        type: "confirm",
        message: "Would you like to purchase another item?"
    }]).then(function(ans) {
        if(ans.reply) {
            addInventory();
        } else {
            console.log("Inventory has been updated");
        }
    });
}



inventory();