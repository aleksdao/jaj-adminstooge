/// HOME STATES ///
app.config(function ($stateProvider) {
    $stateProvider.state('livemode', {
        url: '/livemode',
        templateUrl: '/js/live/live.html',
        resolve: {
          showList: function(SequenceHandler){
            return SequenceHandler.fetchAllShows();
          }
        },
        controller: 'LiveCtrl'
    });
});

/// sample show
var sampleShow = {
  show_length:'14:0:0',
  name: 'Together Demo - Wander by Startank',
  settings:{
    bpm: 83,
    resolution:'16n',
    time_sig: 4
  },
  events:[
    {time: '0:0:0', action: 'changeText', params: {text: 'Wander', target:'title'}},
    {time: '0:0:0', action: 'changeText', params: {text: 'by Startank', target:'body'}},
    {time: '0:1:0', action: 'fadeColorTo', preload:true, params: {color: randColor()}},
    {time: '0:2:0', action: 'fadeColorTo', preload:true, params: {color: randColor()}},
    {time: '0:3:0', action: 'fadeColorTo', preload:true, params: {color: randColor()}},
    {time: '1:0:0', action: 'changeText', params: {text: ' ', target:'title'}},
    {time: '1:0:0', action: 'changeText', params: {text: ' ', target:'body'}},
    {time: '1:0:0', action: 'fadeColorTo', preload:true, params: {color: randColor()}},
    {time: '1:1:0', action: 'fadeColorTo', preload:true, params: {color: randColor()}},
    {time: '1:2:0', action: 'fadeColorTo', preload:true, params: {color: randColor()}},
    {time: '1:3:0', action: 'fadeColorTo', preload:true, params: {color: randColor()}},
    {time: '2:0:0', action: 'changeColor', params: {color: randColor()}},
    {time: '2:1:0', action: 'changeColor', params: {color: randColor()}},
    {time: '2:2:0', action: 'changeColor', params: {color: randColor()}},
    {time: '2:3:0', action: 'changeColor', params: {color: randColor()}},
    {time: '3:0:0', action: 'changeColor', params: {color: randColor()}},
    {time: '3:1:0', action: 'changeColor', params: {color: randColor()}},
    {time: '3:2:0', action: 'changeColor', params: {color: randColor()}},
    {time: '3:3:0', action: 'changeColor', params: {color: randColor()}},
    {time: '3:0:0', action: 'changeText', params: {text: 'W', target:'title'}},
    {time: '3:1:0', action: 'changeText', params: {text: 'Wa', target:'title'}},
    {time: '3:2:0', action: 'changeText', params: {text: 'Wan', target:'title'}},
    {time: '3:3:0', action: 'changeText', params: {text: 'Wander', target:'title'}},
    {time: '4:0:0', action: 'changeText', params: {text: ' ', target:'title'}},
    {time: '4:0:0', action: 'changeColor', params: {color: '#202020'}},
    {time: '4:3:0', action: 'fadeColorTo', preload:true, params: {color: randColor()}},
    {time: '5:0:0', action: 'changeColor', params: {color: '#202020'}},
    {time: '5:3:0', action: 'changeColor', params: {color: randColor()}},
    {time: '6:0:0', action: 'changeColor', params: {color: '#202020'}},
    {time: '6:3:0', action: 'changeColor', params: {color: randColor()}},
    {time: '7:0:0', action: 'changeColor', params: {color: '#202020'}},
    {time: '7:3:0', action: 'changeColor', params: {color: randColor()}},
    {time: '8:0:0', action: 'changeColor', params: {color: '#202020'}},
    {time: '8:1:0', action: 'changeColor', params: {color: randColor()}},
    {time: '8:2:0', action: 'changeColor', params: {color: '#202020'}},
    {time: '8:3:0', action: 'changeColor', params: {color: randColor()}},
    {time: '9:0:0', action: 'changeColor', params: {color: '#202020'}},
    {time: '9:1:0', action: 'changeColor', params: {color: randColor()}},
    {time: '9:2:0', action: 'changeColor', params: {color: '#202020'}},
    {time: '9:3:0', action: 'changeColor', params: {color: randColor()}},
    {time: '10:0:0', action: 'changeColor', params: {color: '#202020'}},
    {time: '10:1:0', action: 'changeColor', params: {color: randColor()}},
    {time: '10:2:0', action: 'changeColor', params: {color: '#202020'}},
    {time: '10:3:0', action: 'changeColor', params: {color: randColor()}},
    {time: '11:0:0', action: 'changeColor', params: {color: '#202020'}},
    {time: '11:2:0', action: 'strobeFlash', params: { }},
    {time: '11:2:2', action: 'strobeFlash', params: { }},
    {time: '11:3:0', action: 'strobeFlash', params: { }},
    {time: '11:3:2', action: 'strobeFlash', params: { }},
    {time: '12:0:0', action: 'changeColor', params: {color: randColor()}},
    {time: '12:1:0', action: 'changeColor', params: {color: randColor()}},
    {time: '12:2:0', action: 'changeColor', params: {color: randColor()}},
    {time: '12:3:0', action: 'changeColor', params: {color: randColor()}},
    {time: '13:0:0', action: 'changeColor', params: {color: randColor()}},
    {time: '13:1:0', action: 'changeColor', params: {color: randColor()}},
    {time: '13:2:0', action: 'changeColor', params: {color: randColor()}},
    {time: '13:3:0', action: 'changeColor', params: {color: randColor()}},
    {time: '14:0:0', action: 'changeColor', params: {color: randColor()}},
    {time: '14:1:0', action: 'changeColor', params: {color: randColor()}},
    {time: '14:2:0', action: 'changeColor', params: {color: randColor()}},
    {time: '14:3:0', action: 'changeColor', params: {color: randColor()}},
    {time: '15:0:0', action: 'changeColor', params: {color: randColor()}},
    {time: '15:1:0', action: 'changeColor', params: {color: randColor()}},
    {time: '15:2:0', action: 'changeColor', params: {color: randColor()}},
    {time: '15:3:0', action: 'changeColor', params: {color: randColor()}},

  ]
};


app.controller('LiveCtrl', function($scope, $timeout, $rootScope, socket, SequenceHandler, SongFactory, showList){
  $scope.transportState = updateState(SequenceHandler);
  $scope.currentShow = null;
  $scope.showList = showList;
  $scope.showList.push(sampleShow);
  $scope.data = {toLoad:null, ready: false};

  SongFactory.load('/assets/together_demo.mp3');

  SequenceHandler.init({container: '#previewWindow', title: '#previewTitle', body:'#previewBody'});

  $scope.startShow = function(){
    socket.emit('admin command', {message: 'play', params:{ startTime: $scope.data.startTime * 1000, sequence: $scope.currentShow } });
  };

  $scope.stopShow = function(){
    SongFactory.stop();
    Tone.Transport.stop();
    Tone.Transport.position = 0;
    $rootScope.$broadcast('show ended');
  }

  $scope.loadShow = function(){
    //grab show from list
    var newShow = $scope.showList[$scope.data.toLoad];

    //load show to timeline
    SequenceHandler.loadSequence(newShow);
    $scope.currentShow = newShow;
    $scope.data.ready = true;

    //send show to clients
    socket.emit('admin command', {message: 'send show', params:{ sequence: newShow } });
  };

  $scope.reset = function(){
    $scope.data.startTime = null;
    $scope.data.ready = false;
  };

  $scope.$watch('data.toLoad', function() {
      //load the show!
      var newShow = $scope.showList[$scope.data.toLoad];
      if(newShow){
        $scope.currentShow = newShow;
      }

   });

  //handle sockets
  $rootScope.$on("show started", function(){
    $scope.transportState = "started";
  });
  $rootScope.$on("show ended", function(){
    $scope.transportState = "stopped";
    $scope.reset();
  });

  socket.on('play', function(data){
    SequenceHandler.queueStart(data.startTime, true, $scope.song);
    $scope.transportState = updateState(SequenceHandler);
  });

});

function updateState(SequenceHandler){
  return SequenceHandler.getTransportState();
}

function randColor(){
  return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
}
