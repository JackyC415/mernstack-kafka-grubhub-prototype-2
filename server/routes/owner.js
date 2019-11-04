const Menus = require("../models/Menu");

exports.getOwnerMenu = (req, res) => {

    if (!req.session.isLoggedIn) {
        console.log("Please log in to update profile.");
    } else {
        Menus.find({ owner_id: req.session.ID }, (err, items) => {
            if (err) {
                throw err;
            } else if (items) {
                res.status(200).send(items);
            } else {
                return res.status(404).send("No items on the menu!");
            }
        });
    }
};

exports.removeItem = (req, res) => {
    console.log("INSIDE REMOVE ITEM")
    if (!req.session.isLoggedIn) {
        return res.status(400).json("Please login!");
    } else {
        Menus.findOneAndRemove({ _id: req.params.id }, function(err) {
            if(err) throw err;
            res.status(200).json('Deleted item!');
        });
    }
};

exports.saveItem = (req, res) => {
    console.log('INSIDE ADD ITEM MENU');

    if (!req.session.isLoggedIn) {
        return res.status(400).json("Please login!");
    } else {
        Menus.findOne({ item_name: req.body.item_name }).then(item => {
            if (item) {
                res.status(400).json("Item already exists!");
            } else {
                const newMenuItem = new Menus({
                    item_name: req.body.item_name,
                    item_desc: req.body.item_desc,
                    item_image: req.body.item_image,
                    item_quantity: req.body.item_quantity,
                    item_price: req.body.item_price,
                    item_section: req.body.item_section,
                    owner_id: req.session.ID
                });
                newMenuItem.save()
                    .then(() => res.status(200).json("Item saved!"))
                    .catch(err => res.status(400).json(err))
            }
        });
    }
};

exports.updateItem = (req, res) => {
    console.log("INSIDE EDIT ITEM")
    if (!req.session.isLoggedIn) {
        return res.status(400).json("Please login!");
    } else {
        const updateItem = {
            item_name: req.body.item_name,
            item_desc: req.body.item_desc,
            item_image: req.body.item_image,
            item_quantity: req.body.item_quantity,
            item_price: req.body.item_price
        }
        Menus.findOneAndUpdate({ _id: req.body.id }, updateItem, function (err) {
            if (err) throw err;
            res.status(200).json(true);
        });
    }
};

exports.getItemToEdit = (req, res) => {
    console.log("INSIDE EDIT ITEM")
    if (!req.session.isLoggedIn) {
        return res.status(400).json("Please login!");
    } else {
        Menus.findById({ _id: req.params.id }, (err, item) => {
            if (err) {
                throw err;
            } else {
                console.log(item);
                res.status(200).send(item);
            }
        });
    }
};

exports.getBreakfastMenu = (req, res) => {

    if (!req.session.isLoggedIn) {
        console.log("Please log in to update profile.");
    } else {
        Menus.find({ owner_id: req.session.ID, item_section: 'Breakfast' }, (err, items) => {
            if (err) {
                throw err;
            } else if (items) {
                res.status(200).send(items);
            } else {
                return res.status(404).send("No items on the menu!");
            }
        });
    }
};