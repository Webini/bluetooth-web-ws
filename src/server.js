const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const debug = require('./debug');
const connectClient = require('./connectClient');
const errorHandler = require('./errorHandler');
module.exports = { io, server };
const bluetooth = require('./bluetooth');

require('dotenv').config();

bluetooth.initialize().catch(errorHandler);

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

server.listen(port, host, () => {
  debug(`Server listening on ${host}:${port}`);
});

io.on('connection', (socket) => {
  connectClient(socket);
});

