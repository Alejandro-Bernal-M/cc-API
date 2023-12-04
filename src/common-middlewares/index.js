const jwt = require('jsonwebtoken');

exports.requireSignin = async (req, res, next) => {
  const { token } = req.headers.authorization;
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

exports.adminMiddleware = async (req, res, next) => {
  const { role } = req.user.role;
  if (role !== 'admin') {
    return res.status(401).json({ message: 'Access denied' });
  }
  next();
  return null;
};
