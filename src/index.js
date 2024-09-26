'use strict';

const { server: httpServer, sessionMiddleware } = require('./server');
const { port } = require('./config/config');
const { Server } = require('socket.io');
const { setupSocketIoHandlers } = require('./socket');

const PORT = port || 3000;

const io = new Server(httpServer, {
  path: '/socket.io/', // путь по умолчанию. для безопасности лучше менять наверное в .env выносить
  cors: {
    origin: '*', // домен, который имеет доступ (для дев поставил что все)
    methods: ['GET', 'POST'],
  },
  transports: ['websocket', 'polling'], // Поддержка транспорта
});

// Настройка Socket.IO для работы с сессиями
io.engine.use(sessionMiddleware);

// Настройка аутентификации для Socket.IO
io.use((socket, next) => {
  console.log("io index.js")
  const session = socket.request.session;
  console.log('Session:', session);
  if (session) {
    socket.userId = socket.request.session.passport.user;
    next();
  } else {
    console.log('Authentication error: no valid session');
    next(new Error('Authentication error'));
  }
});

setupSocketIoHandlers(io);

// ошибки
io.engine.on("connection_error", (err) => {
  console.error(err.req);      // the request object
  console.error(err.code);     // the error code, for example 1
  console.error(err.message);  // the error message, for example "Session ID unknown"
  console.error(err.context);  // some additional error context
});


httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Обработка ошибок сервера
httpServer.on('error', err => {
  console.error('Server error:', err);
});
