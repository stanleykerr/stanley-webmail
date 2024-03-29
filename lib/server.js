const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

module.exports = (app, server) => {
  return new Promise(resolve => {
    const io = require('socket.io')(server);
    app.locals.io = io;

    io.on('connection', (client) => {
      console.log('client connected');

      client.on('authenticate', (token) => {
        jwt.verify(token, jwtSecret, (err, decoded) => {
          if (err)
            return client.emit('data', 'authentication failed! invalid jwt');
        
          const _id = decoded.sub;
          client.join(_id);
          client.emit('data', 'authentication successful!');
        });
      });

      client.on('disconnect', (data) => {
        console.log('client disconnected');
      });
    });
    resolve();
  });
};