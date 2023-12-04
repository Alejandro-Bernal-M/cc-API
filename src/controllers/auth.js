const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (req, res) => {
  const userFoundByEmail = await User.findOne({ email: req.body.email });
  console.log(userFoundByEmail);
  if (userFoundByEmail) {
    res.status(400).json({ message: 'user already exists' });
  } else {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        adminPassword,
        role,
      } = req.body;
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
      });
      if (role === 'admin') {
        if (adminPassword === process.env.ADMIN_PASSWORD) {
          newUser.role = 'admin';
        } else {
          return res.status(400).json({ message: 'Wrong admin password' });
        }
      } else {
        newUser.role = 'user';
      }
      const savedUser = await newUser.save();
      if (savedUser === newUser) {
        const token = jwt.sign({ id: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.status(200).json({
          token,
          user: {
            _id: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email,
            role: savedUser.role,
          },
        });
      } else {
        return res.status(400).json({ message: 'Error saving the user' });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Something went wrong', errors: error.errors });
    }
  }
  return Promise;
};

exports.signin = async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) return res.status(400).json({ message: 'Incorrect email or password' });

    if (foundUser.authenticate(req.body.password)) {
      const token = jwt.sign({ _id: foundUser._id, role: foundUser.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
      const {
        _id,
        firstName,
        lastName,
        email,
        role,
      } = foundUser;

      res.status(200).json({
        token,
        user: {
          _id,
          firstName,
          lastName,
          email,
          role,
        },
      });
    } else {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong' });
  }
  return Promise.resolve();
};
