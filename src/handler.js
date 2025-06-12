const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const users = require('./users');

const SECRET_KEY = process.env.JWT_SECRET;

const registerUserHandler = (request, h) => {
  const { email, password } = request.payload;
  
  if (users.find((u) => u.email === email)) {
    return h.response({
      status: 'fail',
      message: 'Email already registered',
    }).code(400);
  }

  const id = nanoid(16);
  const newUser = { id, email, password };

  users.push(newUser);

  return h.response({
    status: 'success',
    message: 'User successfully registered',
    data: {
      id,
      email,
    },
  }).code(201);
};

const loginUserHandler = (request, h) => {
  const { email, password } = request.payload;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return h.response({
      status: 'fail',
      message: 'Invalid email or password',
    }).code(401);
  }

  const token = jwt.sign({ userId: user.id }, SECRET_KEY);

  return h.response({
    status: 'success',
    message: 'Login successful',
    data: { token },
  }).code(200);
};

const getUserByIdHandler = (request, h) => {
  const { userId } = request.auth.credentials;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return h.response({
      status: 'fail',
      message: 'User not found',
    }).code(404);
  }

  return h.response({
    status: 'success',
    data: {
      user: {
        id: user.id,
        email: user.email,
      },
    },
  }).code(200);
};

const editUserByIdHandler = (request, h) => {
  const { userId } = request.auth.credentials;
  const { email, password } = request.payload;

  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Failed to update user. Id not found',
    }).code(404);
  }

  users[index] = {
    ...users[index],
    email,
    password,
  };

  return h.response({
    status: 'success',
    message: 'User successfully updated',
  }).code(200);
};

const deleteUserByIdHandler = (request, h) => {
  const { userId } = request.auth.credentials;
  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Failed to delete user. Id not found',
    }).code(404);
  }

  users.splice(index, 1);

  return h.response({
    status: 'success',
    message: 'User successfully deleted',
  }).code(200);
};

module.exports = {
  registerUserHandler,
  loginUserHandler,
  getUserByIdHandler,
  editUserByIdHandler,
  deleteUserByIdHandler,
};