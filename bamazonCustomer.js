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

//function to get user product choice
function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        inquirer.prompt([{
//get product type from user
                name: "product_name",
                type: "list",
                message: "Which product would you like to purchase?",
                choices: function () {
                    var choices = [];
                    for (var i = 0; i < res.length; i++) {
                        choices.push(res[i].item_id + ": " + res[i].product_name + " $" + res[i].price)
                    }
                    return choices
                }
            },
//get product quantity from user
            {
                name: "product_quantity",
                type: "input",
                message: "How many would you like to purchase?",
                when: function(answers) {
                    return answers.product_name
                }
            }
        ]).then(function(answers) {

            var splitSelectedItem = answers.product_name.split(":");
            var selectedItem = splitSelectedItem[0];
            var productQuantity = parseInt(answers.product_quantity);
            var total;
            var stockQuantity;
            var newProdQuant;
            var productPrice;

            connection.query("SELECT * FROM products WHERE ?", [{item_id: selectedItem}], function(error, res) {
                if (error) throw error;
                    stockQuantity = parseInt(res[0].stock_quantity);
                    newProdQuant = stockQuantity - productQuantity;
                    productPrice = parseInt(res[0].price);
                    total = productQuantity * productPrice;

                    console.log(stockQuantity);
                    console.log(newProdQuant);
                    console.log(productPrice);
                    console.log(total);
            })
        })
    })
}

displayItems();