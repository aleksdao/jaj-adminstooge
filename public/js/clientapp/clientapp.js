var clientApp = angular.module('together-client', ['ui.router', 'ngMaterial', 'ngToast'])

clientApp.config(function ($urlRouterProvider, $locationProvider, $mdThemingProvider, ngToastProvider) {

    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);

    // If we go to a URL that ui-router doesn't have registered, go to the "/app" url.
    $urlRouterProvider.otherwise('/app');

    $mdThemingProvider.theme('default')
     .primaryPalette('grey')
     .accentPalette('teal', {
       default:'A400'
     })
     .dark();

     //set up toast anims
     ngToastProvider.configure({
       animation: 'fade' // or 'fade'
     });


});

clientApp.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: '/app',
    templateUrl: 'js/clientapp/templates/errorPage.html',
    controller: 'ErrorController'
  })
    .state('login', {
      url: '/app/login',
      templateUrl: 'js/clientapp/templates/login.html',
      controller: 'LoginController'
    })
    .state('showPage', {
      url: '/app/showPage',
      templateUrl: 'js/clientapp/templates/showPage.html',
      controller: 'ShowController'
    })
    .state('stagingPage', {
      url: '/app/stagingPage',
      templateUrl: 'js/clientapp/templates/stagingPage.html',
      controller: 'StagingController'
    })
    .state('errorPage', {
      url: '/app/errorPage',
      templateUrl: 'js/clientapp/templates/errorPage.html',
      controller: 'ErrorController'
    })
    .state('contestPage', {
      url: '/app/contestPage',
      templateUrl: 'js/clientapp/templates/contestPage.html',
      controller: 'ContestController',
      params:{
        message: null
      }
    })
    .state('settingsPage', {
      url: '/app/settingsPage',
      templateUrl: 'js/clientapp/templates/settings.html',
      controller: 'SettingsController'
    });

});

clientApp.run(function($state, ipAddressFactory, socket){

  /// init server connection ///
 ipAddressFactory.fetchIpAddresses()
 .then(function(){
   //connect to client socket
   socket.connect(ipAddressFactory.getSocketIP(), '/client');

   socket.startPingRepeat(100);
 });

 //pass in the audio context
  StartAudioContext.setContext(Tone.context);
  var elem = document.getElementById('mainapp');
  StartAudioContext.on(elem);

});
