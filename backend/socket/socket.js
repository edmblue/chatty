import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true, // Permitir el uso de credenciales
  },
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  const userId = socket.handshake.query.userId;

  if (userId != 'undefined') userSocketMap[userId] = socket.id;

  // Send to all clients

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  // Manejo de desconexión del usuario
  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export { app, io, server };
