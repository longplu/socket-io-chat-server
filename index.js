const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        // origin: 'https://socket-io-chat-long.netlify.app/',
        origin: ['*'],

    handlePreflightRequest: (req, res) => {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST',
            'Access-Control-Allow-Headers': 'my-custom-header',
            'Access-Control-Allow-Credentials': true
        });
        res.end();
    }}
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
