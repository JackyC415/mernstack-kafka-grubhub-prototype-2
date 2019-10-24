//References: https://react-bootstrap.github.io/components/forms/

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../App.css';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            email: null,
            password: null,
            restaurantname: null,
            zipcode: null,
            cuisine: null,
            phone: null,
            owner: false,
            output: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchForm = this.switchForm.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    //send registration data to server for processing
    sendRestAPI = (data) => {
        axios.post('http://localhost:3001/register', data)
            .then(res => {
                this.setState({ output: res.data })
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const buyerData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            restaurantname: "N/A",
            cuisine: "N/A",
            zipcode: "N/A",
            phone: "N/A",
            owner: false
        }

        const ownerData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            restaurantname: this.state.restaurantname,
            zipcode: this.state.zipcode,
            cuisine: "N/A",
            phone: "N/A",
            owner: true
        }

        if (!this.state.owner) {
            this.sendRestAPI(buyerData);
        } else {
            this.sendRestAPI(ownerData);
        }

    }

    //switch between user and owner sign up form
    switchForm = (e) => {
        (!this.state.owner) ? this.setState({ owner: true }) : this.setState({ owner: false });
    }

    render() {
        let ownerForm = null;
        let accountType = "Owner";

        if (this.state.owner) {
            ownerForm =
                <div>
                    <Form.Group controlId="formRestaurantname">
                        <Form.Label>Restaurant Name:</Form.Label>
                        <Form.Control type="text" name="restaurantname" maxlength="30" placeholder="Restaurant name" value={this.state.restaurantname} onChange={this.handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formZipcode">
                        <Form.Label>Zipcode:</Form.Label>
                        <Form.Control type="number" name="zipcode" maxlength="5" placeholder="5 digits" value={this.state.zipcode} onChange={this.handleChange} required/>
                    </Form.Group>
                </div>
            accountType = "User";
        }

        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h2>Create account</h2>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Your name" minlength="3" maxlength="30" value={this.state.name} onChange={this.handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="At least 6 characters" minlength="6" maxlength="16" value={this.state.password} onChange={this.handleChange} required />
                    </Form.Group>
                    {ownerForm}
                    <Button variant="primary" type="submit">
                        Register
                    </Button> &nbsp;
                    <Button onClick={this.switchForm}>Sign Up as {accountType}</Button>
                    <div>Already have an account? <Link to="/login">Login</Link></div><br />
                    <div> {this.state.output} </div>
                </Form>
            </div>
        )
    }
}

export default Register;