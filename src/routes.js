const { 
  registerUserHandler, 
  loginUserHandler, 
  getUserByIdHandler, 
  editUserByIdHandler,
  deleteUserByIdHandler,
} = require('./handler');

const verifyToken = require('./utils/verifyToken');

const routes = [
  {
    method: 'POST',
    path: '/register',
    handler: registerUserHandler,
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginUserHandler,
  },
  {
    method: 'GET',
    path: '/profile',
    options: {
      pre: [{ method: verifyToken }],
      handler: getUserByIdHandler,
    },
  },
  {
    method: 'PUT',
    path: '/profile',
    options: {
      pre: [{ method: verifyToken }],
      handler: editUserByIdHandler,
    },
  },
  {
    method: 'DELETE',
    path: '/profile',
    options: {
      pre: [{ method: verifyToken }],
      handler: deleteUserByIdHandler,
    },
  },
];
 
module.exports = routes;