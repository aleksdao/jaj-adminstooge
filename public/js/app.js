var app = angular.module('jaj-admin', []);

var socket = io.connect();

app.run(function(SocketServer){

  /// init admin socket connection ///
  SocketServer.initSocketServer();

});


app.controller('HomeCtrl', function($scope, SocketServer){

  $scope.event = {};
  $scope.msgLog = [];
  $scope.clientList = [];

  $scope.sendMessage = function(){
    //MessageFactory.emit($scope.event);
  };

  // socket.on("*",function(event, data) {
  //     $scope.msgLog.push(event + ': ' + data);
  //     $scope.$digest();
  // });



  socket.on("admin updated client list", function(clientList){
    $scope.clientList = clientList;
    $scope.$digest();
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
