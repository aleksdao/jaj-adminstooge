var socket = io.connect('/client');

socket.emit('add user', {name: 'User' + Math.floor(Math.random()*1000)});
