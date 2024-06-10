const express = require('express');
const http = require('http');
const { port } = require('../config');

const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server);

(async function () {
  server.listen(port, () => {
    try {
      console.log(`Server listening on port ${port}`);
    } catch (err) {
      console.log(err);
    }
  });
})();
