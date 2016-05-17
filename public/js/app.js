var app = angular.module('jaj-admin', []);

var socket = io();


app.controller('HomeCtrl', function($scope, MessageFactory){

  $scope.event = {};
  $scope.msgLog = [];

  $scope.sendMessage = function(){
    MessageFactory.emit($scope.event);
  };

  socket.on("*",function(event, data) {
      $scope.msgLog.push(event + ': ' + data);
      $scope.$digest();
  });

});

app.factory('MessageFactory', function($http){

  return {
    emit: function(event){
      var msgData = {};
      msgData[event.key] = event.value; //parse input group data
      socket.emit('admin broadcast', {type: event.type, eventData: msgData}); //send message
    }

  };

});

//make an 'all event' handler
var onevent = socket.onevent;
socket.onevent = function (packet) {
    var args = packet.data || [];
    onevent.call (this, packet);    // original call
    packet.data = ["*"].concat(args);
    onevent.call(this, packet);      // additional call to catch-all
};
