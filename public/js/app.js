var app = angular.module('jaj-admin', ['ui.router','ngMaterial']);


app.config(function ($urlRouterProvider, $locationProvider, $mdThemingProvider) {

    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/admin" url.
    $urlRouterProvider.otherwise('/admin');

    $mdThemingProvider.theme('default')
     .primaryPalette('grey')
     .accentPalette('deep-orange');

});

app.run(function(socket){

  /// init admin socket connection ///
  socket.connect('/admin');
  socket.emit('add admin', 'Admin');

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
