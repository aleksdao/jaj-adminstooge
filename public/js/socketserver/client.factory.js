app.factory('SocketServer', function(){

  var isAdmin;

  socket.on("welcome admin", function(message){
    isAdmin = true;
  });




  return {

    initSocketServer: function(){

      socket.emit('admin connected');
      socket.emit('add user', 'Admin Dude');

    }


  };


});
