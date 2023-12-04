const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authorization required' });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Token error' });
  }
  next();
  return null;
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ message: 'Access denied' });
  }
  next();
  return null;
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(401).json({ message: 'Access denied' });
  }
  next();
  return null;
};
