var clientApp = angular.module('together-client', ['ui.router','ngMaterial'])

console.log(clientApp)

clientApp.config(function ($urlRouterProvider, $locationProvider, $mdThemingProvider) {

    // // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    // $locationProvider.html5Mode(true);
    // // If we go to a URL that ui-router doesn't have registered, go to the "/admin" url.
    // $urlRouterProvider.otherwise('/app');


});

// var socket = io.connect('/client');
//
// var userName = 'User' + Math.floor(Math.random()*1000);
//
// socket.emit('add user', {name: userName});
//
// socket.on('get user info', function(){
//   socket.emit('add user', {name: userName});
// });
//
// socket.on('connection closed', function(){
//   console.log('shut it down')
//   socket.emit('remove user', {name: userName});
// });
