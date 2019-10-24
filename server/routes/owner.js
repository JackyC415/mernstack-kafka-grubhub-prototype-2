const connection = require('./database');

exports.getOwnerID = (req, res) => {
    res.send(req.session.ownerID);
};

exports.getOwnerMenu = (req, res) => {
    if (req.session.isLoggedIn) {
        let ownerMenu = "SELECT * FROM menus WHERE menu_owner = ? AND menu_section = ?";
        connection.query(ownerMenu, [req.session.ID, req.body.menu_section], (err, results) => {
            if (err) {
                throw err;
            } else if (results.length > 0) {
                console.log("Sending owner menu's result...")
                res.send(results);
            } else {
                console.log("Can't find owner's menu!");
            }
        });
    } else {
        console.log("Please log in first!");
    }
};

exports.removeItem = (req, res) => {
    console.log("INSIDE REMOVE ITEM")
    const { p_name, p_description, p_image, p_quantity, p_price } = req.body;
    console.log(req.body);
    if (req.session.isLoggedIn) {
        let ownerMenu = "DELETE FROM menus WHERE p_name = ? AND p_description = ? AND p_image = ? AND p_quantity = ? AND p_price = ? LIMIT 1";
        connection.query(ownerMenu, [p_name, p_description, p_image, p_quantity, p_price], (err, results) => {
            if (err) {
                throw err;
            } else {
                res.sendStatus(200);
                console.log("DELETED!");
            }
        });
    } else {
        console.log("Please log in first!");
    }
};

exports.saveItem = (req, res) => {
    console.log('INSIDE SAVE ITEM')
    const { p_id, p_name, p_description, p_image, p_quantity, p_price, menu_section } = req.body;
    if (!req.session.isLoggedIn) {
        console.log("Please log in first!");
    } else {
        let findItem = "SELECT p_id FROM menus WHERE menu_owner = ? AND p_id = ? AND menu_section = ?";
        connection.query(findItem, [req.session.ID, p_id, menu_section], (err, results) => {
            if (err) {
                throw err;
            } else if (results.length > 0) {
                let updateItem = "UPDATE menus " + "SET p_name = ?, p_description = ?, p_image = ?, p_quantity = ?, p_price = ? WHERE p_id = ?";
                connection.query(updateItem, [p_name, p_description, p_image, p_quantity, p_price, p_id], (err, results) => {
                    if (err) throw err;
                    console.log(results);
                });
            } else {
                let insertItem = "INSERT INTO menus " + "SET p_name = ?, p_description = ?, p_image = ?, p_quantity = ?, p_price = ?, menu_section = ?, menu_owner = ?";
                connection.query(insertItem, [p_name, p_description, p_image, p_quantity, p_price, menu_section, req.session.ID], (err, results) => {
                    if (err) throw err;
                    console.log(results);
                });
            }
        });
        res.sendStatus(200);
    }
};