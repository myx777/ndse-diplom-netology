const { server } = require('./server');
const socketIO = require('socket.io');

const { port } = require('./config/config');

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Обработка ошибок сервера
server.on('error', (err) => {
  console.error('Server error:', err);
});
