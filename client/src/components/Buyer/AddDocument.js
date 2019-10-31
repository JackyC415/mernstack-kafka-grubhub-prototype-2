import React, { Component } from 'react';
import axios from 'axios';

class AddDocument extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item_name: '',
      item_desc: '',
      item_image: '',
      item_quantity: '',
      item_price: ''
    }
  }

  addItemToMenu = () => {

    const data = {
      item_name: this.state.item_name,
      item_desc: this.state.item_desc,
      item_image: this.state.item_image,
      item_quantity: this.state.item_quantity,
      item_price: this.state.item_price
    };

    axios.post('http://localhost:3001/saveItem', data)
      .then(res => {
        (res.status === 200) ? alert('Item saved!') : alert('Item already exists!');
        this.props.history.push('/listDocument')
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Add Menu Item</h2>
        <div className="row justify-content-md-center">
          <div className="col-md-6 col-md-offset-3">
            <form>
              <div className="form-group">
                <label>Name:</label>
                <input name="item_name" type="text" className="form-control" onChange={this.handleChange} value={this.state.item_name}></input>
              </div>
              <div className="form-group">
                <label>Description:</label>
                <input name="item_desc" type="text" className="form-control" onChange={this.handleChange} value={this.state.item_desc}></input>
              </div>
              <div className="form-group">
                <label>Image:</label>
                <input name="item_image" type="text" className="form-control" onChange={this.handleChange} value={this.state.item_image}></input>
              </div>
              <div className="form-group">
                <label>Quantity:</label>
                <input name="item_quantity" type="text" className="form-control" onChange={this.handleChange} value={this.state.item_quantity}></input>
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input name="item_price" type="text" className="form-control" onChange={this.handleChange} value={this.state.item_price}></input>
              </div>
              <button type="button" onClick={this.addItemToMenu} className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default AddDocument;
