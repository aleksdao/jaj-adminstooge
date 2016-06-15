/// HOME STATES ///
app.config(function ($stateProvider) {
    $stateProvider.state('livemode', {
        url: '/livemode',
        templateUrl: '/js/live/live.html',
        resolve: {

        },
        controller: 'LiveCtrl'
    });
});

/// sample show
var sampleShow = {
  show_length:'2:0:0',
  name: 'Sample oo',
  settings:{
    bpm: 120,
    resolution:'16n',
    time_sig: 4
  },
  events:[
    {time: '0:0:0', action: 'changeColor', params: {color: randColor()}},
    {time: '0:1:0', action: 'changeColor', params: {color: randColor()}},
    {time: '0:2:0', action: 'changeColor', params: {color: randColor()}},
    {time: '0:3:0', action: 'changeColor', params: {color: randColor()}},
    {time: '0:3:0', action: 'changeText', params: {text: 'hey there', target:'title', color: randColor()}},
    {time: '1:0:0', action: 'fadeColorTo', preload:true, params: {color: randColor()}},
    {time: '1:1:0', action: 'fadeColorTo', preload:true, params: {color: randColor()}},
    {time: '1:2:0', action: 'fadeColorTo', preload:true, params: {color: randColor()}},
    {time: '1:3:0', action: 'fadeColorTo', preload:true, params: {color: randColor()}},

  ]
};


app.controller('LiveCtrl', function($scope, $timeout, socket, SequenceHandler, SongFactory){
  $scope.transportState = updateState(SequenceHandler);
  $scope.currentShow = sampleShow;

  SongFactory.load('/assets/default.wav');

  SequenceHandler.init({container: '#previewWindow', title: '#previewTitle', body:'#previewBody'});
  SequenceHandler.loadSequence(sampleShow);

  $scope.restartShow = function(){

    socket.emit('admin command', { message: 'send message', params: { text: 'Show is about to start!', duration: 1000 } });

    socket.emit('admin command', {message: 'send show', params:{ sequence: sampleShow } });
<<<<<<< HEAD
    $timeout(function(){
      socket.emit('admin command', {message: 'play', params:{ startTime: 3000, sequence: sampleShow } });

    }, 2000);
=======
>>>>>>> 8a7514ba0385d76d125d35288c35adca505c4873

    $timeout(function(){
      socket.emit('admin command', {message: 'play', params:{ startTime: 3000, sequence: sampleShow } });
    }, 1000);
  };

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
};
