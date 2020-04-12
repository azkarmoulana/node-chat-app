var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    socket.emit('createEmail', {
        to: 'dave@sample.com',
        text:'Hi dave, this is azkar.',
        createdAt: new Date()
    })
});

socket.on('newEmail', function(email) {
    console.log('New Email received', email)
});

socket.on('disconnect', function() {
    console.log('Disconnected from the server')
});