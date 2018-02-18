const Home = require('./handlers/home');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

exports.register = (plugin, options, next) => {

  plugin.route([
    { method: 'GET', path: '/', config: Home.hello },
    {
      method: 'GET',
      path: '/devices/{device}/{variable}',
      config: {
        handler: function(request,reply) {
          
          return reply({
            result: getRandomInt(150)
          }).code(200);
        }
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};