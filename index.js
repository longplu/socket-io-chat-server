import { createServer } from 'http';
import { Server } from 'socket.io';
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: 'https://socket-io-chat-long.netlify.app',
        credentials: true,
    },
});

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    });

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data);
    });

    socket.on('disconnect', ()=> {
        console.log(`User Disconnected: ${socket.id}`);
    });
});

server.listen(3001, () => {
    console.log("SERVER RUNNING")
});
