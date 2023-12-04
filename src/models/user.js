const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
});

function setPassword(password) {
  this.hashPassword = bcrypt.hashSync(password, 12);
}

function getFullname() {
  return `${UserSchema.firstName} ${UserSchema.lastName}`;
}

UserSchema.virtual('password').set(setPassword);

UserSchema.virtual('fullname').get(getFullname);

UserSchema.methods.authenticate = function authenticatePassword(password) {
  return bcrypt.compareSync(password, this.hashPassword);
};

module.exports = mongoose.model('User', UserSchema);
