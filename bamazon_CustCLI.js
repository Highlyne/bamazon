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
    welcome();
});

function welcome() {
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
                    connection.query('SELECT * FROM Full_list WHERE department = ?', ["Baby"], function (err, res) {
                        console.log("\n");
                        console.table(res);
                        console.log("\n");
                        buyWhat();
                    });
                    break;

                case "Toy Department":
                    connection.query('SELECT * FROM Full_list WHERE department = ?', ["Toy"], function (err, res) {
                        console.log("\n");
                        console.table(res);
                        console.log("\n");
                        buyWhat();
                    });
                    break;

                case "Women Department":
                    connection.query('SELECT * FROM Full_list WHERE department = ?', ["Women"], function (err, res) {
                        console.log("\n");
                        console.table(res);
                        console.log("\n");
                        buyWhat();
                    });
                    break;
            }
        })
};

var product;
var buyQTY;
var stockINV;
var itemCost;

function buyWhat() {
    inquirer.prompt({
        name: "productID",
        type: "input",
        message: "Which item ID would you like to purchase?\n"
    })
        .then(function (answer) {
            product = answer.productID;
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
            buyQTY = answer.qty;

            connection.query('SELECT * FROM Full_list WHERE id = ?', [product], function (err, res) {

                if (err) throw err;


                for (i = 0; i < res.length; i++) {
                    stockINV = res[i].qty_available;
                    itemCost = res[i].price_USD;
                }

                if (stockINV < buyQTY) {
                    console.log("Sorry. Bamazon is not able to complete that request.  Please select another quanity.");
                    howMany();
                } else {
                    console.log("Your total is: $" + itemCost * buyQTY);
                    makePurchase();
                }
            })
        })
};

function makePurchase() {
    inquirer.prompt({
        name: "confirmPurchase",
        type: "confirm",
        message: "Would you like to make this purchase?"
    }) 
    .then(function (answer) {
        if (answer.confirmPurchase === true) {
            console.log("\n Thank you!  Your purchase is complete.");
            connection.end();}
        else if (answer.confirmPurchase === false) {
            console.log("\n Please make another selection");
            // showBabyTable();
            connection.end();
            }
    })
};

// console.log("\n Thank you! Your order has been placed");
// connection.end();
// })};