const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Client connected')

    socket.on('createMessage', (message) => {
        console.log('create message ', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })
});

app.use(express.static(publicPath));

server.listen(port, () => [
    console.log(`Server is up on ${port}...`)
]);
