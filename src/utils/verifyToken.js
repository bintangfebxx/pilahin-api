const jwt = require('jsonwebtoken');

const verifyToken = (request, h) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return h.response({
      status: 'fail',
      message: 'Missing or invalid token',
    }).code(401).takeover();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    request.auth = {
      isAuthenticated: true,
      credentials: { userId: decoded.userId },
    };

    return h.continue;
  } catch (err) {
    return h.response({
      status: 'fail',
      message: 'Invalid or expired token',
    }).code(401).takeover();
  }
};

module.exports = verifyToken;