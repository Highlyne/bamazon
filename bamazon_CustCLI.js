var inquirer = require('inquirer');
var mysql = require("mysql");
var table = require('console.table');
var Table = require('easy-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

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
                "Women Department"]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Baby Department":

                    connection.query("SELECT * FROM Baby", function (err, res) {
                        console.table(res);});
                        showProductTable();
                    break;

                case "Toy Department":
                connection.query("SELECT * FROM Toy", function (err, res) {
                    console.table(res);});
                    showProductTable();
                    break;

                case "Women Department":
                connection.query("SELECT * FROM Women", function (err, res) {
                    console.table(res);});
                    showProductTable();
                    break;
            }
        });
};

var product = "";
var qty = "";

function showProductTable() {
        inquirer.prompt({
            name: "productID",
            type: "input",
            message: "Which item ID would you like to purchase?"
        })    
        .then(function (answer) {
            product = answer.productID
                howMany();
            })
        };

function howMany() {
            inquirer.prompt({
                name: "qty",
                type: "input",
                message: "How many?"
                })
                .then(function (answer) {
                    // shoppingCart();
                    qty = answer.qty;
                    console.log("Here is product and how many " + product + qty);
                    connection.end();
                })
            };

// function makePurchaseBaby() {
//         connection.query("SELECT * FROM Baby WHERE id = ?", [x], function (err, res) {
//             console.table(res);

//             inquirer.prompt({
//                 name: "babyPurchase",
//                 type: "confirm",
//                 message: "Do you confirm?"
//             }) .then(function (answer) {
//                if (answer.babyPurchase === true) {
//                     console.log("\n Your purchase is complete. Thank you!");
//                     connection.end();
//                } else if (answer.babyPurchase === false) {
//                    console.log("\n Please make another selection");
//                    showBabyTable();
//                    connection.end();
//                     }
//                 })
            
//         });
//     };
// };