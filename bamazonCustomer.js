var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: "3306",

    user: "root",

    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connect as id " + connection.threadId);

    displayProducts();
});


const displayProducts = function () {
    const query = connection.query("SELECT * FROM products", function (err, res) {


        if (err) throw err;


        for (var i = 0; i < res.length; i++) {


            console.log("Product ID: " + res[i].item_id + " | Product Name: " + res[i].product + " | Price: " + res[i].price);
        }
        console.log("-------------------------------");

        pullProduct();

    });
};

const pullProduct = function () {
    inquirer
        .prompt([
            {
                name: "ProductID",
                type: "input",
                message: "Enter the product ID for the product you want. ",

                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }

                    return false;
                }

            },

            {
                name: "ProductUnits",
                type: "input",
                message: "How many units do you want? ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }

                    return false;
                }


            }


        ]).then(function (inquirerResponse) {
            if (err) throw err;
        })
}


