const mysql = require('mysql');

//initialize database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'lab1DB'
});

//connect to mySQL and create tables
connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL database connected!');
    let userSQL = "CREATE TABLE IF NOT EXISTS user(id INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(255) NOT NULL, restaurantname VARCHAR(255) NOT NULL, cuisine VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL, zipcode VARCHAR(100) NOT NULL, owner BOOLEAN)";
    let menuSQL = "CREATE TABLE IF NOT EXISTS menus(p_id INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, p_name VARCHAR(100) NOT NULL, p_description VARCHAR(100) NOT NULL, p_image VARCHAR(255) NOT NULL, p_quantity VARCHAR(255) NOT NULL, p_price VARCHAR(100) NOT NULL, menu_section VARCHAR(100) NOT NULL, menu_owner VARCHAR(100) NOT NULL)";
    let orderSQL = "CREATE TABLE IF NOT EXISTS orders(o_id INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, o_name VARCHAR(100) NOT NULL, o_quantity VARCHAR(255) NOT NULL, buyer_id INT(11) NOT NULL, menu_owner INT(11) NOT NULL)";
    connection.query(userSQL, function (err, result) {
        if (err) throw err;
        console.log("User table created!");
    });
    connection.query(menuSQL, function (err, result) {
        if (err) throw err;
        console.log("Menu table created!");
    });
    connection.query(orderSQL, function (err, result) {
        if (err) throw err;
        console.log("Order table created!");
    });
});

module.exports = connection;