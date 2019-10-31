import React, { Component } from 'react';
import axios from 'axios';

class EditDocument extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item_name: '',
      item_desc: '',
      item_image: '',
      item_quantity: '',
      item_price: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3001/getItemToEdit/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          item_name: res.data.item_name,
          item_desc: res.data.item_desc,
          item_image: res.data.item_image,
          item_quantity: res.data.item_quantity,
          item_price: res.data.item_price
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  editMenuItem = () => {

    const data = {
      item_name: this.state.item_name,
      item_desc: this.state.item_desc,
      item_image: this.state.item_image,
      item_quantity: this.state.item_quantity,
      item_price: this.state.item_price,
      id: this.props.match.params.id
    };

    axios.post('editItem', data)
      .then(json => {
        (json.data.statusCode === 200) ? this.props.history.push('/listDocument') : this.props.history.push('/listDocument');
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Edit Menu Item</h2>
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
              <button type="button" onClick={this.editMenuItem} className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditDocument;