'use strict';

const { server } = require('./server');
const { port } = require('./config/config');
const socketIo = require('socket.io');
const { setupSocketIoHandlers } = require('./socket');
const { sessionMiddleware } = require('./server');

const PORT = port || 3000;

const io = socketIo(server, {
  // восстановление состояния соединения
  connectionStateRecovery: {},
});

// Настройка Socket.IO для работы с сессиями
io.engine.use(sessionMiddleware);

setupSocketIoHandlers(io);

// Настройка аутентификации для Socket.IO
io.use((socket, next) => {
  const session = socket.request.session;
  if (
    session.passport &&
    session.passport.user
  ) {
    next();
  } else {
    next(new Error('Authentication error'));
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Обработка ошибок сервера
server.on('error', err => {
  console.error('Server error:', err);
});
