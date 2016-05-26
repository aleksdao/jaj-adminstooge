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

/// HOME DIRECTIVES ///
app.directive('actionControl', function(){
  return {
    restrict: 'E',
    templateUrl: '/js/home/home.action.html',
  };
});

app.directive('serverStats', function(){
  return {
    restrict: 'E',
    templateUrl: '/js/home/home.serverstats.html',
    controller: 'ServerStatsCtrl'
  };
});

app.directive('actionOneshot', function(){

  return {
    restrict: 'E',
    controller:'HomeOneShotCtrl',
    templateUrl: '/js/home/home.oneshot.html',
  };

});

app.directive('actionSequence', function(){

  return {
    restrict: 'E',
    controller:'HomeSequenceCtrl',
    templateUrl: '/js/home/home.sequence.html',
  };
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

app.controller('ServerStatsCtrl', function($scope){
  $scope.isActive = true;

});

app.controller('HomeSequenceCtrl', function(){

});

app.controller('HomeOneShotCtrl', function(){

});
