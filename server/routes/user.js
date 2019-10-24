const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const connection = require('./database');

exports.register = (req, res) => {

    console.log('Registering...');
    //input validation with joi
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(6).max(16).pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
        restaurantname: Joi.string().max(30),
        zipcode: Joi.string().max(5)
    });

    if (!req.session.isLoggedIn) {
        const { error, value } = schema.validate({ name: req.body.name, email: req.body.email, password: req.body.password, restaurantname: req.body.restaurantname, zipcode: req.body.zipcode });
        if (error) {
            console.log(error);
            res.send('Invalid inputs!');
        } else {
            let checkEmail = "SELECT email FROM user WHERE email = ?";
            connection.query(checkEmail, [req.body.email], (err, results) => {
                if (err) {
                    throw err;
                } else if (results.length > 0) {
                    res.status(404).send('User already exists!');
                } else {
                    const { name, email, password, restaurantname, zipcode, cuisine, phone, owner } = req.body;
                    let userSQL = "INSERT INTO user " + "SET name = ?, email = ?, password = ?, restaurantname = ?, cuisine = ?, zipcode = ?, phone = ?, owner = ?";
                    bcrypt.hash(password, saltRounds, function (err, hash) {
                        if (err) throw err;
                        connection.query(userSQL, [name, email, hash, restaurantname, cuisine, zipcode, phone, owner]);
                        console.log(value);
                        res.status(200).send('Registered successfully!');
                    });
                }
            });
        }
    } else {
        console.log("Can't register when user is logged in.");
    }
};

exports.login = (req, res) => {

    console.log('Login...');
    //validate user inputs w/ Joi
    const schema = Joi.object({
        email: Joi.string().lowercase().trim().email().required(),
        password: Joi.string().min(6).max(16).pattern(/^[a-zA-Z0-9]{3,30}$/).required()
    });

    //once validated, query user credential and validate against hash password w/ bcrypt
    const { error, value } = schema.validate({ email: req.body.email, password: req.body.password });
    if (error) {
        throw error;
    } else {
        let authSQL = "SELECT * FROM user WHERE email = ?";
        connection.query(authSQL, [req.body.email], (err, results) => {
            if (err) {
                throw err;
            } else if (results.length > 0) {
                bcrypt.compare(req.body.password, results[0].password).then(function (bres) {
                    if (bres) {
                        if (results[0].owner == 0) {
                            res.cookie('cookie', "buyer", { maxAge: 900000, httpOnly: false, path: '/' });
                        } else {
                            res.cookie('cookie', "owner", { maxAge: 900000, httpOnly: false, path: '/' });
                        }
                        req.session.email = results[0].email;
                        req.session.ID = results[0].id;
                        req.session.isLoggedIn = true;
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        })
                        res.end("Successful Login!");
                        console.log('Logged in successfully!');
                    } else {
                        console.log("Password does not match!")
                    }
                });
            } else {
                console.log("Invalid credentials!");
                res.sendStatus(404);
            }
        });
    }
};

exports.getProfile = (req, res) => {

    console.log('Retrieving Profile...');
    if (!req.session.isLoggedIn) {
        res.sendStatus(404);
        console.log("User has to be logged in to retrieve profile...");
    } else {
        let profileSQL = "SELECT * FROM user WHERE email = ?";
        connection.query(profileSQL, [req.session.email], (err, results) => {
            if (err) {
                throw err;
            } else if (results.length > 0) {
                console.log(results);
                res.status(200).send(results);
            } else {
                console.log("Can't find user for profile page!");
                res.sendStatus(404);
            }
        });
    }
};

exports.updateProfile = (req, res) => {
    
    console.log('Updating Profile...');
    const { name, email, restaurantname, cuisine, phone } = req.body;
    if (!req.session.isLoggedIn) {
        console.log("Please log in to update profile.");
    } else {
        let updateProfile = "UPDATE user " + "SET name = ?, email = ?, restaurantname = ?, cuisine = ?, phone = ? WHERE id = ?";
        connection.query(updateProfile, [name, email, restaurantname, cuisine, phone, req.session.ID], (err, results) => {
            if (err) {
                throw err;
            } else {
                res.send('Updated profile successfully!');
            }
        });
    }
};

exports.logOut = (req, res) => {
    console.log("Logged out...");
    req.session.isLoggedIn = false;
    res.sendStatus(200);
};