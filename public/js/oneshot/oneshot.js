/// ONESHOT STATES ///
app.config(function ($stateProvider) {
    $stateProvider.state('oneshot', {
        url: '/oneshot',
        templateUrl: '/js/oneshot/oneshot.html',
        resolve: {

        },
        controller: 'OneShotCtrl'
    });
});

app.config(function ($stateProvider) {
    $stateProvider.state('oneshot.photo', {
        url: '/photo',
        templateUrl: '/js/oneshot/oneshot.photo.html',
        resolve: {

        },
        controller: 'PhotoEventCtrl'
    });
});

app.config(function ($stateProvider) {
    $stateProvider.state('oneshot.message', {
        url: '/message',
        templateUrl: '/js/oneshot/oneshot.message.html',
        resolve: {

        },
        controller: 'MsgEventCtrl'
    });
});

app.config(function ($stateProvider) {
    $stateProvider.state('oneshot.contest', {
        url: '/contest',
        templateUrl: '/js/oneshot/oneshot.contest.html',
        resolve: {

        },
        controller: 'ContestEventCtrl'
    });
});

///  DIRECTIVES ///


/// HOME CONTROLLERS ///
app.controller('OneShotCtrl', function($scope, socket){

  $scope.event = {};
  $scope.msgLog = [];
  $scope.currentNavItem = 'page1';

  $scope.sendMessage = function(){
    //socket.emit($scope.event);
  };

});

app.controller('HomeSequenceCtrl', function($scope, $state){

  $scope.currentSequence = "test";
  $scope.data = { startTime: 3};

  $scope.startSequence = function(){
    $state.go('livemode');
  };

});

app.controller('PhotoEventCtrl', function($scope, $window, socket, PhotoEventFactory, ipAddressFactory){

  $scope.data = {};

  $scope.photoEvent = {inProgress: PhotoEventFactory.getStatus(), count: 0, currShow: PhotoEventFactory.getName()};

  $scope.getPhoto = function(){
    $scope.photoEvent.inProgress = true;
    $scope.photoEvent.currShow = $scope.data.eventName;

    var mode = +$scope.data.cameraMode;

    //send photoType 1 for selfie, and 0 photoType 0 for front facing
    socket.emit('admin command', { message: 'get photo', params: { photoType: mode } });

    PhotoEventFactory.startPhotoEvent($scope.data.eventName);

  };

  $scope.processPhoto = function(){
    PhotoEventFactory.processPhotoEvent();
    $scope.photoEvent = {inProgress: false, count: 0};
    $scope.data = {};

  };

  $scope.viewPhotoShow = function(){
    $window.open($scope.data.photoUrl, '_blank');
  };

  $scope.sendPhotoShow = function(){
    socket.emit('admin command', { message: 'view photo event', params: { url: $scope.data.photoUrl } });
  };

  socket.on('photo added', function(data){
    $scope.photoEvent.count = data.count;
  });

  socket.on('photo process done', function(data){
    console.log('photo event', data.directURL);
    $scope.data.photoUrl = ipAddressFactory.getPhotoIP() + data.directURL;
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

  $scope.data = { inProgress: false, lastWinner:undefined, message:undefined };

  $scope.sendMessage = function(){
    socket.emit('contest random', { params: { text: $scope.data.message } });
    $scope.data.message = null;
  };

  socket.on('winner name', function(data){

  });
});

app.controller('HomeOneShotCtrl', function($scope, socket, PhotoEventFactory, ipAddressFactory){

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
