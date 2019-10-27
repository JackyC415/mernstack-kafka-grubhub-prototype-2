const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  restaurantname: {
    type: String,
    required: true,
    default: "N/A"
  },
  cuisine: {
    type: String,
    required: true,
    default: "N/A"
  },
  phone: {
    type: String,
    unique: true,
    default: "N/A"
  },
  zipcode: {
    type: String,
    required: true,
    default: "N/A"
  },
  owner: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Users = mongoose.model("User", UsersSchema);