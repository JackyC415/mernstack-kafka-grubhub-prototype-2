import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import { Link } from 'react-router-dom';

class ListDocument extends Component {
  constructor(props) {
    super(props);
    this.state = { items: '' };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/getOwnerMenu')
      .then(res => {
        this.setState({ items: res.data });
      }).catch((error) => {
        console.log(error);
      });
  }

  tabRow() {
    if (this.state.items instanceof Array) {
      return this.state.items.map(function (object, i) {
        return <TableRow obj={object} key={i} />;
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h3>Menu</h3>
        <Link to={"/addDocument"} >Add New Item</Link>
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

export default ListDocument;
