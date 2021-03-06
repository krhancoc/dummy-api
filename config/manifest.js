const envKey = key => {
  const env = 'development';

  const configuration = {
    development: {
      host: 'localhost',
      port: 8080
    },
    uat: {
      host: 'localhost',
      port: 8080
    },
    // These should match environment variables on hosted server
    production: {
      host: 'localhost',
      port: 8080
    }
  };

  return configuration[env][key];
};

const manifest = {
  connections: [
    {
      host: envKey('host'),
      port: envKey('port'),
      routes: {
        cors: true
      },
      router: {
        stripTrailingSlash: true
      }
    }
  ],
  registrations: [
    {
      plugin: 'hapi-auth-jwt2'
    },
    {
      plugin: './auth'
    },
    {
      plugin: './api',
      options: { routes: { prefix: '/v1' } }
    },
    {
      plugin: {
        register: 'good',
        options: {
          ops: { interval: 60000 },
          reporters: {
            console: [
              { module: 'good-squeeze', name: 'Squeeze', args: [{ error: '*' }] }, { module: 'good-console' }, 'stdout'
            ]
          }
        }
      }
    }
  ]
};

module.exports = manifest;