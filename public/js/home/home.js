/// HOME STATES ///
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/admin',
        templateUrl: '/js/home/home.html',
        resolve: {

        },
        controller: 'HomeCtrl'
    });
});

app.config(function ($stateProvider) {
    $stateProvider.state('home.oneshot', {
        url: '/',
        templateUrl: '/js/home/home.oneshot.html',
        resolve: {

        },
        controller: 'HomeOneShotCtrl'
    });
});

app.config(function ($stateProvider) {
    $stateProvider.state('home.sequence', {
        url: '/',
        templateUrl: '/js/home/home.sequence.html',
        resolve: {

        },
        controller: 'HomeSequenceCtrl'
    });
});

/// HOME CONTROLLERS ///
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

app.controller('HomeSequenceCtrl', function(){

});

app.controller('HomeOneShotCtrl', function(){

});
