import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authorization = req.headers['authorization'];
  const token = authorization && authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Token Required' });
  }

  jwt.verify(token, process.env.TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Access Token' });
    }

    req.user = decoded.user; // ✅ clean user object
    next();
  });
};

export default authenticateToken;
