import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {
  constructor(props) {
    super(props);
  }

  removeMenuItem = () => {
    axios.delete('http://localhost:3001/removeItem/' + this.props.obj._id)
      .then(res => {
        if (res.status === 200) {
          alert("Deleted item: " + this.props.obj._id + " successfully!");
          this.props.history.push('/listDocument');
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
        <td><Link to={"/getItemToEdit/" + this.props.obj._id} className="btn btn-primary">Edit</Link></td>
        <td>
          <form >
            <button type="button" onClick={this.removeMenuItem} className="btn btn-danger">Delete</button>
          </form>
        </td>
      </tr>
    );
  }
}

export default withRouter(TableRow);
