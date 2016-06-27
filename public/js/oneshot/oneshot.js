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

app.controller('PhotoEventCtrl', function($scope, $rootScope, $window, socket, PhotoEventFactory, ipAddressFactory){

  $scope.data = {};

  $scope.events = null;

  $scope.photoEvent = {inProgress: PhotoEventFactory.getStatus(), count: 0, currShow: PhotoEventFactory.getName()};

  $rootScope.$on('photo event update', function(){
    $scope.events = PhotoEventFactory.getList();
  });

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

  $scope.viewPhotoShow = function(showId){
    $window.open(PhotoEventFactory.getById(showId).mosaicURL, '_blank');
  };

  $scope.sendPhotoShow = function(showId){
    socket.emit('admin command', { message: 'mosaic ready', params: PhotoEventFactory.getList() });
  };

  socket.on('photo added', function(data){
    $scope.photoEvent.count = data.count;
  });


});

app.controller('MsgEventCtrl', function($scope, socket){

  $scope.data = {};

  $scope.sendMessage = function(){
    socket.emit('admin command', { message: 'send message', params: { text: $scope.data.message, duration: 1500 } });
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

app.controller('HomeOneShotCtrl', function($scope, $rootScope, PhotoEventFactory, ipAddressFactory){

  $scope.data = {};

  $scope.photoEvent = {inProgress: false, count: 0};

  $scope.events = PhotoEventFactory.getList();


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
