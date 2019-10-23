const connection = require('./database');

exports.getBuyerOrders = (req, res) => {
    console.log("Retrieving Buyer Orders...");
    if (!req.session.isLoggedIn) {
        res.sendStatus(404);
    } else {
        let profileSQL = "SELECT * FROM orders WHERE menu_owner = ?";
        connection.query(profileSQL, [req.session.ID], (err, results) => {
            if (err) {
                throw err;
            } else if (results.length > 0) {
                console.log(results);
                res.status(200).send(results);
            } else {
                console.log("Can't find any orders for this owner!");
            }
        });
    }
};

exports.addToCart = (req, res) => {

    console.log("Adding Orders to Cart...");
    const { o_name, o_quantity, menu_owner } = req.body;
    console.log(req.body);
    if (!req.session.isLoggedIn) {
        console.log("Please log in first!");
    } else {
        let ownerMenu = "INSERT INTO orders " + "SET o_name = ?, o_quantity = ?, buyer_id = ?, menu_owner = ?";
        connection.query(ownerMenu, [o_name, o_quantity, req.session.ID, menu_owner], (err, results) => {
            if (err) {
                throw err;
            } else {
                res.sendStatus(200);
                console.log("ADDED ORDER!");
            }
        });
    }
};

exports.getBuyerCart = (req, res) => {

    console.log('Retrieving Cart Items...');
    if (!req.session.isLoggedIn) {
        res.sendStatus(404);
    } else {
        let profileSQL = "SELECT * FROM orders WHERE buyer_id = ?";
        connection.query(profileSQL, [req.session.ID], (err, results) => {
            if (err) {
                throw err;
            } else if (results.length > 0) {
                console.log(results);
                res.status(200).send(results);
            } else {
                console.log("Can't find any cart items for this owner!");
            }
        });
    }
};