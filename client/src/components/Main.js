import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import navbar from './Navbar/Navbar';
import login from './User/Login';
import register from './User/Register';
import profile from './User/Profile';
import buyerhome from './Buyer/Homepage';
import viewCart from './Buyer/ViewCart';
import addToCart from './Buyer/AddToCart';
import ownerhome from './Owner/Homepage';
import ownerMenu from './Owner/Menu';
import viewOrder from './Owner/ViewOrder';

//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={navbar} />
                <Route path="/register" component={register} />
                <Route path="/login" component={login} />
                <Route path="/profile" component={profile} />
                <Route path="/buyerhome" component={buyerhome} />
                <Route path="/buyerhome/addtocart" component={addToCart} />
                <Route path="/buyerhome/viewcart" component={viewCart} />
                <Route path="/ownerhome" component={ownerhome} />
                <Route path="/ownerhome/vieworder" component={viewOrder} />
                <Route path="/ownerhome/menu" component={ownerMenu} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;