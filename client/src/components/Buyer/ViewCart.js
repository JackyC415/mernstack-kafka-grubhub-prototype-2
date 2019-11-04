import React, { Component } from 'react';
import axios from 'axios';
import RemoveCartItem from './RemoveCartItem';

class ViewCart extends Component {
  constructor(props) {
    super(props);
    this.state = { items: '' };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/viewcart')
      .then(res => {
        this.setState({ items: res.data });
      }).catch((error) => {
        console.log(error);
      });
  }

  tabRow() {
    if (this.state.items instanceof Array) {
      return this.state.items.map(function (object, i) {
        return <RemoveCartItem obj={object} key={i} />;
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h3>View Cart</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Name</td>
              <td>Description</td>
              <td>Image</td>
              <td>Quantity</td>
              <td>Price</td>
              <td></td>
            </tr>
          </thead>
          <tbody> {this.tabRow()} </tbody>
        </table>
      </div>
    );
  }
}

export default ViewCart;
