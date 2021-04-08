const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('chat message', (msg) => io.emit(`chat message`, msg));
  socket.on('disconnect', () => console.log('user disconnected'));
});

server.listen(3000, () => console.log('listeningn on *:3000'));
