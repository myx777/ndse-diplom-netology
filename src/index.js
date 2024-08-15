'use strict';

const { server } = require('./server');
const { port } = require('./config/config');
const io = require('socket.io')(server);
const { setupSocketIoHandlers} = require("./socket");
const { sessionMiddleware } = require('./server');
const { sharedSession } = require('express-socket.io-session');

const PORT = port || 3000;

// Настройка Socket.IO для работы с сессиями
io.use(sharedSession(sessionMiddleware, {
  autoSave: true
}));
setupSocketIoHandlers(io);

// Настройка аутентификации для Socket.IO
io.use((socket, next) => {
  if (socket.handshake.session.passport && socket.handshake.session.passport.user) {
    next();
  } else {
    next(new Error('Authentication error'));
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Обработка ошибок сервера
server.on('error', (err) => {
  console.error('Server error:', err);
});
