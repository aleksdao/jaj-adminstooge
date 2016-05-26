var socket = io.connect('/client');

socket.on('go away', function(){
  console.log('bye');
});
