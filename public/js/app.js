var app = angular.module('jaj-admin', []);

var socket = io();


app.controller('HomeCtrl', function($scope, MessageFactory){

  $scope.event = {};

  $scope.sendMessage = function(){

    MessageFactory.emit($scope.event);
  };

  socket.on('hello', function (data) {
    console.log('new msg',data);
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
