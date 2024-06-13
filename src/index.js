const { server } = require('./server');
const socketIO = require('socket.io');

const { port } = require('./config/config');


const PORT = port || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Обработка ошибок сервера
server.on('error', (err) => {
  console.error('Server error:', err);
});
