import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OwnerHome extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <li><Link to="/ownerhome/menu">Menu</Link></li>
                <li><Link to="/ownerhome/vieworder">View Orders</Link></li>
            </div>
        )
    }
}

export default OwnerHome;