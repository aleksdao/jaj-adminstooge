clientApp.controller('SettingsController', function($scope, $state, socket){
  $scope.data = { ping: 200 };

  $scope.update = function(){

    //update ping
    socket.stopPingRepeat();
    socket.startPingRepeat($scope.data.ping);

    //go back to staging
    $state.go('stagingPage');

  };
});
