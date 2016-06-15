var app = angular.module('jaj-admin', ['ui.router','ngMaterial','ngAudio']);


app.config(function ($urlRouterProvider, $locationProvider, $mdThemingProvider) {

    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/admin" url.
    $urlRouterProvider.otherwise('/');

    $mdThemingProvider.theme('default')
     .primaryPalette('grey')
     .accentPalette('teal', {
       default:'A400'
     })
     .dark();

});

app.run(function(socket, ipAddressFactory){

  /// init admin socket connection ///
  socket.connect('/admin');
  socket.startPingRepeat(200);
  socket.emit('add admin', 'Admin');

});

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/js/main/main.html',
        resolve: {
          ipAddress: function(ipAddressFactory){

            return ipAddressFactory.fetchIpAddresses();

          }

        }
    });
});
