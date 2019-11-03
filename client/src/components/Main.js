import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import navbar from './Navbar/Navbar';
import login from './User/Login';
import register from './User/Register';
import profile from './User/Profile';
import buyerhome from './Buyer/Homepage';
import ListDocument from './Buyer/ListDocument';
import EditDocument from './Buyer/EditDocument';
import addDocument from './Buyer/AddDocument';
import ownerhome from './Owner/Homepage';
import ownerMenu from './Owner/Menu';
import Search from './Buyer/Search';

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
                <Route path="/listDocument" component={ListDocument} />
                <Route path="/getItemToEdit/:id" component={EditDocument} />
                <Route path="/addDocument" component={addDocument} />
                <Route path="/ownerhome" component={ownerhome} />
                <Route path="/ownerhome/menu" component={ownerMenu} />
                <Route path="/search/pagination" component={Search} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;