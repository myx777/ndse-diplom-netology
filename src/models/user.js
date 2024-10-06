/**
 * модель данных USER
 */
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
  },
  salt: {
    type: String,
  },
});

const User = model('User', UserSchema);
module.exports = User;
