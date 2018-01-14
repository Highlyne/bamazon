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
                "View products for sale",
                "View low inventory",
                "Add to inventory",
                "Add new product"]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View products for sale":
                    connection.query('SELECT * FROM Full_list', function (err, res) {
                        console.log("\n");
                        console.table(res);
                        console.log("\n");
                        cont();
                    });
                    break;

                case "View low inventory":
                    connection.query('SELECT * FROM Full_list WHERE qty_available = qty_available < 10', function (err, res) {
                        console.log("\n");
                        console.table(res);
                        console.log("\n");
                        addInventory();
                        });
                    break;

                case "Add to inventory":
                    connection.query('SELECT * FROM Full_list WHERE department = ?', ["Women"], function (err, res) {
                        console.log("\n");
                        console.table(res);
                        console.log("\n");
                        buyWhat();
                    });
                    break;

                case "Add new product":
                connection.query('SELECT * FROM Full_list WHERE department = ?', ["Women"], function (err, res) {
                    console.log("\n");
                    console.table(res);
                    console.log("\n");
                    buyWhat();
                });
                break;

                case "Exit":
                process.end();
                break;
            }
        })
};

var product;
var buyQTY;
var stockINV;
var itemCost;

function addWhat() {
    inquirer.prompt({
        name: "productID",
        type: "input",
        message: "Which item ID would you like to add stock?"
    })
        .then(function (answer) {
            product = answer.productID;
            howMany();
        })
};

function addInventory() {
    inquirer.prompt({
        name: "low_inventory",
        type: "input",
        message: "The items above are low in stock.  Would you like to add more?"
    })
    .then(function (answer) {        
        if (answer.low_inventory === true) {
                    addWhat();
                } else {
                    welcome();
                    }
            })
        
};

// Continue coding from here below. 

function makePurchase() {
    inquirer.prompt({
        name: "confirmPurchase",
        type: "confirm",
        message: "Would you like to make this purchase?"
    }) 
    .then(function (answer) {
        if (answer.confirmPurchase === true) {
            updateQTY();
            console.log("Here is the buyers qty: " + buyQTY);
            console.log("Here is the stock available: " + stockINV);
            connection.end();}
        else if (answer.confirmPurchase === false) {
            console.log("\n Please make another selection");
            welcome();
            }
    })
};

function updateQTY(r,p) {
    
    connection.query('UPDATE Full_list SET qty_available = qty_available - ? WHERE id = ?', [buyQTY, product], function (err, res) {
        console.log("\n Thank you!  Your purchase is complete.\n");
        shopORquit();
})
};

function cont() {
    inquirer.prompt({
        name: "continue",
        type: "confirm",
        message: "Would you like to make another selection?"
    }) 
    .then(function (answer) {
        if (answer.continue === true) {
            welcome();
            }
        else if (answer.confirmPurchase === false) {
            console.log("\n Thank you. Goodbye.")
        .then(function(){
                process.exit();
            })
        }
    })
};