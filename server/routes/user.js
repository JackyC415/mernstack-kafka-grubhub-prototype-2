const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const connection = require('./database');
const Users = require("../models/User");
const jwt = require("jsonwebtoken");

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
            throw error;
        } else {
            Users.findOne({ email: req.body.email }).then(user => {
                if (user) {
                    console.log('Email already exists!');
                    return res.status(400).json("Email already exists!");
                } else {
                    const newUser = new Users({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        restaurantname: req.body.restaurantname,
                        cuisine: req.body.cuisine,
                        zipcode: req.body.zipcode,
                        phone: req.body.phone,
                        owner: req.body.owner
                    });
                    bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(() => res.json('User added!'))
                            .catch(err => res.status(400).json('Error: ' + err))
                    });
                }
            });
        }
    } else {
        return res.status(400).json("Please logout first to register!");
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
        Users.findOne({ email: req.body.email }).then(user => {
            if (!user) return res.status(404).json('Email does not exist!');
            bcrypt.compare(req.body.password, user.password).then(isMatch => {
                if (isMatch) {
                    jwt.sign(
                        { id: user.id }, 'secret', { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    email: user.email
                                }
                            });
                        }
                    );

                    if (!user.owner) {
                        res.cookie('cookie', "buyer", { maxAge: 900000, httpOnly: false, path: '/' });
                    } else {
                        res.cookie('cookie', "owner", { maxAge: 900000, httpOnly: false, path: '/' });
                    }
                    req.session.email = user.email;
                    req.session.ID = user.id;
                    req.session.isLoggedIn = true;
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Successful Login!");
                    console.log('Logged in successfully!');
                } else {
                    return res.status(400).json('Incorrect password!');
                }
            });
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