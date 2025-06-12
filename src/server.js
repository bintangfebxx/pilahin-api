require('dotenv').config();

const routes = require('./routes');
const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: 7000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: process.env.NODE_ENV !== 'production'
          ? ['*']
          : ['https://myfrontend.example.com'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();