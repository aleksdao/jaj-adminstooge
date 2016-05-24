var app = angular.module('jaj-admin', ['ngMaterial']);

app.run(function(socket){

  /// init admin socket connection ///
  socket.initAdminSocket();

});


app.controller('HomeCtrl', function($scope, socket){

  $scope.event = {};
  $scope.msgLog = [];
  $scope.clientList = [];


  $scope.sendMessage = function(){
    //socket.emit($scope.event);
  };

  //new users have joined server, update list
  socket.on("admin updated client list", function(clientList){
    $scope.clientList = clientList;
  });


  //removes all listenres from Socket just in case the scope gets destroyed
  $scope.$on('$destroy', function (event) {
    socket.cleanup();
  });

});

app.factory('MessageFactory', function($http){

  return {
    emit: function(event){
      var msgData = {};
      msgData[event.key] = event.value; //parse input group data
      //socket.emit('admin broadcast', {type: event.type, eventData: msgData}); //send message
    }

  };

});

//make an 'all event' handler
// var onevent = socket.onevent;
// socket.onevent = function (packet) {
//     var args = packet.data || [];
//     onevent.call (this, packet);    // original call
//     packet.data = ["*"].concat(args);
//     onevent.call(this, packet);      // additional call to catch-all
// };
