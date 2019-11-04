import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

class RemoveCartItem extends Component {
  constructor(props) {
    super(props);
  }

  removeCart = () => {
    axios.delete('http://localhost:3001/cancelCartItem/' + this.props.obj._id)
      .then(res => {
        if (res.status === 200) {
          alert("Removed item: " + this.props.obj._id + " successfully!");
          this.props.history.push('/viewCart');
        } else {
          this.props.history.push('/');
        }
      }).catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.item_name}</td>
        <td>{this.props.obj.item_desc}</td>
        <td>{this.props.obj.item_image}</td>
        <td>{this.props.obj.item_quantity}</td>
        <td>{this.props.obj.item_price}</td>
        <td>
          <form >
            <button type="button" onClick={this.removeCart} className="btn btn-danger">Cancel</button>
          </form>
        </td>
      </tr>
    );
  }
}

export default withRouter(RemoveCartItem);
