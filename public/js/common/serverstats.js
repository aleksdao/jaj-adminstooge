app.directive('serverStats', function(){
  return {
    restrict: 'E',
    templateUrl: '/js/common/serverstats.html',
    controller: 'ServerStatsCtrl',
    scope:{
    }
  };
});

app.controller('ServerStatsCtrl', function($scope, $interval, ipAddressFactory, socket){
  $scope.serverOnline = true;
  $scope.clientList = [];
  $scope.data = { showDetails: false, showIP: ipAddressFactory.getSocketIP(), photoIP: ipAddressFactory.getPhotoIP()};

  ipAddressFactory.fetchIpAddresses()
  .then(function(){
    $scope.data = { showDetails: false, showIP: ipAddressFactory.getSocketIP(), photoIP: ipAddressFactory.getPhotoIP()};
  });

  socket.emit('get client list');

  $scope.toggleServerStatus = function(){
    socket.emit('toggle online status');
  };

  $scope.updateIp = function(){
    ipAddressFactory.updateIP($scope.data.photoIP, $scope.data.showIP)
    .then(function(){

    });
  };

  $scope.refreshClients = function(){
    socket.emit('refresh client list');
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
