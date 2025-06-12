const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const users = require('../users');

const SECRET_KEY = 'my-secret';

const registerUserHandler = (request, h) => {
  const { username, password } = request.payload;

  if (users.find((u) => u.username === username)) {
    return h.response({
      status: 'fail',
      message: 'Username already exists',
    }).code(400);
  }

  const id = nanoid(16);
  const newUser = { id, username, password };

  users.push(newUser);

  return h.response({
    status: 'success',
    message: 'User successfully registered',
    data: {
      id,
      username,
    },
  }).code(201);
};

const loginUserHandler = (request, h) => {
  const { username, password } = request.payload;

  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return h.response({
      status: 'fail',
      message: 'Invalid username or password',
    }).code(401);
  }

  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

  return h.response({
    status: 'success',
    message: 'Login successful',
    data: { token },
  }).code(200);
};

const getUserByIdHandler = (request, h) => {
  const { id } = request.params;
  const user = users.find((u) => u.id === id);

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
        username: user.username,
      },
    },
  }).code(200);
};

const editUserByIdHandler = (request, h) => {
  const { id } = request.params;
  const { username, password } = request.payload;

  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Failed to update user. Id not found',
    }).code(404);
  }

  users[index] = {
    ...users[index],
    username,
    password,
  };

  return h.response({
    status: 'success',
    message: 'User successfully updated',
  }).code(200);
};

const deleteUserByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = users.findIndex((u) => u.id === id);

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
