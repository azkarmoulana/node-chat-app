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

    socket.emit('newEmail', {
        from: "mike@example.com",
        text: "Hey buddy, what's going on...!!",
        createdAt: new Date()
    });

    socket.on('createEmail', (newEmail) => {
        console.log('new email ', newEmail)
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })
});

app.use(express.static(publicPath));

server.listen(port, () => [
    console.log(`Server is up on ${port}...`)
]);
