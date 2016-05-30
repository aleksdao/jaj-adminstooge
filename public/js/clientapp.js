var socket = io.connect('/client');

var userName = 'User' + Math.floor(Math.random()*1000);

socket.emit('add user', {name: userName});

socket.on('get user info', function(){
  socket.emit('add user', {name: userName});
});

socket.on('connection closed', function(){
  console.log('shut it down')
  socket.emit('remove user', {name: userName});
});
