import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

class CancelOrder extends Component {
  constructor(props) {
    super(props);
  }

  cancelOrder = () => {
    axios.delete('http://localhost:3001/cancelOrder/' + this.props.obj._id)
      .then(res => {
        if (res.status === 200) {
          alert("Cancelled menu item!");
          this.props.history.push('/ownerhome/menu');
        }
      }).catch((err) => {
        console.log(err);
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
            <button type="button" onClick={this.cancelOrder} className="btn btn-danger">Cancel</button>
          </form>
        </td>
      </tr>
    );
  }
}

export default withRouter(CancelOrder);
