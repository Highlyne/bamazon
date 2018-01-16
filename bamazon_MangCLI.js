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
    console.log("Welcome Manager connection is sucessful\n");
    welcome();
});

function welcome() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "Please make a selection from below?",
            choices: [
                "View products for sale",
                "View items with low inventory",
                "Add to inventory",
                "Add new product",
                "Exit"]
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

                case "View items with low inventory":
                    connection.query('SELECT * FROM Full_list WHERE qty_available<= 15', function (err, res) {
                        console.log("\n");
                        console.table(res);
                        console.log("\n");
                        addToWhat();
                        });
                    break;

                case "Add to inventory":
                   addToWhat();
                    break;

                case "Add new product":
                addQuestions();
                break;

                case "Exit":
                connection.end();
                break;
            }
        })
};

var itemID;
var addQTY;
var itemName;
var itemPrice;
var price;
var dep;
var newItem = [{
    name: "productNM",
    type: "input",
    message: "Enter item name"
}, {
    name: "productPR",
    type: "input",
    message: "Enter item price"
}, {
    name: "productQTY",
    type: "input",
    message: "How many are available"
}, {
    name: "productDEP",
    type: "input",
    message: "Add to what department?"
}];


function addToWhat() {
    connection.query('SELECT * FROM Full_list', function (err, res) {
        console.log("\n");
        console.table(res);
        console.log("\n");
    })
    inquirer.prompt({
        name: "productID",
        type: "input",
        message: "Which item ID would you like to add more stock?"
            })
        .then(function (answer) {
            itemID = answer.productID;
            howMany();
        })
};

function howMany() {
    inquirer.prompt({
        name: "howMany",
        type: "input",
        message: "How many do you wish to add?"
    })
        .then(function (answer) {
            addQTY = answer.howMany;
            updateQTY();
        })
};

function itemPrice() {
    inquirer.prompt({
        name: "itemPrice",
        type: "input",
        message: "What is the item price?"
    })
        .then(function (answer) {
            price = answer.itemPrice;
        })
};

function addQuestions() {
    inquirer.prompt(newItem)
    .then(function (answer) {
        addQTY = answer.productQTY;
        itemName = answer.productNM;
        itemPrice = answer.productPR;
        dep = answer.productDEP;
        addNewItem();
        })
    };


function updateQTY(a,p) {
    
    connection.query('UPDATE Full_list SET qty_available = qty_available + ? WHERE id = ?', [addQTY, itemID], function (err, res) {
        console.table(res);
        cont();
})
};

function addNewItem() {
    connection.query('INSERT INTO Full_list SET ?', {item: itemName, price_USD: itemPrice, qty_available: addQTY, department: dep}, function (err, res) {
        if (error) throw error;
        console.log(results.insertId);
    })
        console.log(itemName + " has been added to the " + dep + " department.")
        cont();
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
        else if (answer.continue === false) {
            console.log("\n Thank you. Goodbye.");
        
                connection.end();
            }
        
    })
};