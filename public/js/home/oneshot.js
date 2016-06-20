/// ONESHOT STATES ///
app.config(function ($stateProvider) {
    $stateProvider.state('oneshot', {
        url: '/oneshot',
        templateUrl: '/js/home/oneshot.html',
        resolve: {

        },
        controller: 'OneShotCtrl'
    });
});


app.config(function ($stateProvider) {
    $stateProvider.state('oneshot.photo', {
        url: '/photo',
        templateUrl: '/js/home/oneshot.photo.html',
        resolve: {

        },
        controller: 'PhotoEventCtrl'
    });
});

app.config(function ($stateProvider) {
    $stateProvider.state('oneshot.message', {
        url: '/message',
        templateUrl: '/js/home/oneshot.message.html',
        resolve: {

        },
        controller: 'MsgEventCtrl'
    });
});

app.config(function ($stateProvider) {
    $stateProvider.state('oneshot.contest', {
        url: '/contest',
        templateUrl: '/js/home/oneshot.contest.html',
        resolve: {

        },
        controller: 'ContestEventCtrl'
    });
});

///  DIRECTIVES ///

app.directive('serverStats', function(){
  return {
    restrict: 'E',
    templateUrl: '/js/home/home.serverstats.html',
    controller: 'ServerStatsCtrl',
    scope:{
    }
  };
});



/// HOME CONTROLLERS ///
app.controller('OneShotCtrl', function($scope, socket){

  $scope.event = {};
  $scope.msgLog = [];
  $scope.currentNavItem = 'page1';

  $scope.sendMessage = function(){
    //socket.emit($scope.event);
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

  //new users have joined server, update list
  socket.on("admin updated client list", function(clientList){
    $scope.clientList = clientList;
  });

  //removes all listenres from Socket just in case the scope gets destroyed
  $scope.$on('$destroy', function (event) {
    socket.cleanup();
  });

});

app.controller('HomeSequenceCtrl', function($scope, $state){

  $scope.currentSequence = "test";
  $scope.data = { startTime: 3};

  $scope.startSequence = function(){
    $state.go('livemode');
  };

});

app.controller('PhotoEventCtrl', function($scope, socket, PhotoEventFactory){

  $scope.data = {};

  $scope.photoEvent = {inProgress: PhotoEventFactory.getStatus(), count: 0, currShow: PhotoEventFactory.getName()};

  $scope.getPhoto = function(){
    $scope.photoEvent.inProgress = true;
    $scope.photoEvent.currShow = $scope.data.eventName;
    //send photoType 1 for selfie, and 0 photoType 0 for front facing
    socket.emit('admin command', { message: 'get photo', params: { photoType: $scope.data.cameraMode } });

    PhotoEventFactory.startPhotoEvent($scope.data.eventName);

  };

  $scope.processPhoto = function(){
    PhotoEventFactory.processPhotoEvent();
    $scope.photoEvent = {inProgress: false, count: 0};
    $scope.data = {};

  };

  socket.on('photo added', function(data){
    $scope.photoEvent.count = data.count;
  });


});

app.controller('MsgEventCtrl', function($scope, socket){

  $scope.data = {};

  $scope.sendMessage = function(){
    socket.emit('admin command', { message: 'send message', params: { text: $scope.data.message, duration: 100 } });
    $scope.data.message = null;
  };
});

app.controller('ContestEventCtrl', function($scope, socket){

  $scope.data = {};

  $scope.sendMessage = function(){
    socket.emit('admin command', { message: 'send message', params: { text: $scope.data.message, duration: 4000 } });
    $scope.data.message = null;
  };
});

app.controller('HomeOneShotCtrl', function($scope, socket, PhotoEventFactory){

  $scope.data = {};

  $scope.photoEvent = {inProgress: false, count: 0};

  $scope.sendMessage = function(){
    socket.emit('admin command', { message: 'send message', params: { text: $scope.data.message, duration: 4000 } });
  };

  $scope.getPhoto = function(){
    $scope.photoEvent.inProgress = true;
    //send photoType 1 for selfie, and 0 photoType 0 for front facing
    socket.emit('admin command', { message: 'get photo', params: { photoType: 0 } });

    PhotoEventFactory.startPhotoEvent();

  };

  $scope.processPhoto = function(){
    PhotoEventFactory.processPhotoEvent();
  };

  socket.on('photo added', function(data){

    $scope.photoEvent.count = data.count;

  });

});
