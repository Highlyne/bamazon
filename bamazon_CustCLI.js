var inquirer = require('inquirer');
var mysql = require("mysql");
var table = require('console.table');
var Table = require('easy-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    shoppingCart();

});

function shoppingCart() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "Welcome. Please make a selection from below?",
            choices: [
                "Baby Department",
                "Toy Department",
                "Women Department",
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Baby Department":
                    showBabyTable();

                    break;

                case "Toy Department":
                    // showToyTable();
                    connection.end();
                    break;

                case "Women Department":
                    // showwomenTable();
                    connection.end();
                    break;
            }
        });

    function showBabyTable() {

        connection.query("SELECT * FROM Baby", function (err, res) {

            console.table(res);

            inquirer
                .prompt({
                    name: "productID",
                    type: "input",
                    message: "Which item ID would you like to purchase?"})

                .then(function (answer) {
                    console.log("You have selected to purchase: " + answer.productID);

                    connection.query("SELECT * FROM Baby WHERE id = ?", { id: answer.productID }, function (err, res) {
                        console.table(this.res);   
                    })
                    connection.end();
                })
            })
    };
}