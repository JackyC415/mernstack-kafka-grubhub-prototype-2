import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ManipulateItem extends Component {
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
      }).catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.order_name}</td>
        <td>{this.props.obj.order_quantity}</td>
        <td>{this.props.obj.order_price}</td>
        <td>{this.props.obj.owner}</td>
        <td>{this.props.obj.date}</td>
        <td>
          <form >
            <button type="button" onClick={this.removeCart} className="btn btn-danger">Cancel</button>
          </form>
        </td>
        <td><Link to={"/messageOwner/" + this.props.obj.owner} className="btn btn-primary">Message</Link></td>
      </tr>
    );
  }
}

export default withRouter(ManipulateItem);