const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin:{
      type: Boolean,
     default: false 
    },
    image: {
      type: Object,
      required: true,
      default: {
          public_id : '',
          secure_url: ''
      }
  }
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', userSchema)
