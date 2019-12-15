const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "ice_creamDB"
});
connection.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log("connected as id ", connection.threadId);
    deleteExisting();
    updateExisting();
    createNew();
    selectAll();
});
const deleteExisting = function () {
    const query = connection.query(
        "DELETE FROM products WHERE ?",
        {
            id: 6
        },
        function (err, results) {
            if (err) {
                throw err;
            }
            console.log(JSON.stringify(results, null, 2));
            connection.end();
        }
    );
};
const updateExisting = function () {
    const query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                price: 4.25,
                quantity: 25
            },
            {
                id: 3
            }
        ],
        function (err, results) {
            if (err) {
                throw err;
            }
            console.log(JSON.stringify(results));
            connection.end();
        }
    );
};
const createNew = function () {
    const query = connection.query(
        "INSERT INTO products SET ?",
        {
            flavor: "Salted Caramel",
            price: 6.3,
            quantity: 150
        },
        function (err, results) {
            if (err) {
                throw err;
            }
            console.log(JSON.stringify(results, null, 2));
            connection.end();
        }
    );
    console.log(query.sql);
};
const selectAll = function () {
    connection.query(
        "SELECT flavor,price FROM products WHERE quantity<100",
        function (err, results) {
            if (err) {
                throw err;
            }
            console.log(JSON.stringify(results, null, 2));
            connection.end();
        }
    );
};
