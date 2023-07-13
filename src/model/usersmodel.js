const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const UserSchema = new Schema({
  name: {
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
    unique:true,
  },
  email: {
    type:String,
    required:true,
    unique:true,
  },
  country: {
    type:String,
    required:true,
  },
  gender:{
    type:String,
    required:true,
  },
  resetPasswordToken:{
    type:String,
  }
});
module.exports = mongoose.model('User', UserSchema);



