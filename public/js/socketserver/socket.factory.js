app.factory('socket', function($rootScope){

  var adminStatus = false;
  var socket = io.connect();

  socket.on("welcome admin", function(message){
    adminStatus = true;
  });

  return {

    initAdminSocket: function(){
      socket.emit('admin connected');
      socket.emit('add user', 'Admin Dude');
    },
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    },
    cleanup: function(){
      socket.removeAllListeners();
    },
    isAdmin: function(){
      return adminStatus;
    }
  };
});
