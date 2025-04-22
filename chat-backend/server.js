const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }  // This allows all origins. You can narrow it down later.
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // When a user joins the chat
  socket.on('join', (username) => {
    console.log(`${username} joined`);
  });

  // When a message is received, broadcast it to all clients
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast the message to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});
