const { 
  registerUserHandler, 
  loginUserHandler, 
  getUserByIdHandler, 
  editUserByIdHandler,
  deleteUserByIdHandler,
} = require('./handler');

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
    path: '/profile/{id}',
    handler: getUserByIdHandler,
  },
  {
    method: 'PUT',
    path: '/profile/{id}',
    handler: editUserByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/profile/{id}',
    handler: deleteUserByIdHandler,
  },
];
 
module.exports = routes;