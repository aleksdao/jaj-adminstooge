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


app.controller('LiveCtrl', function($scope, $timeout, socket, SequenceHandler, SongFactory, showList){
  $scope.transportState = updateState(SequenceHandler);
  $scope.currentShow = null;
  $scope.showList = showList;
  $scope.showList.push(sampleShow);
  $scope.data = {toLoad:null};

  SongFactory.load('/assets/default.wav');

  SequenceHandler.init({container: '#previewWindow', title: '#previewTitle', body:'#previewBody'});

  $scope.restartShow = function(){

    socket.emit('admin command', { message: 'send message', params: { text: 'Show is about to start!', duration: 1000 } });
    $timeout(function(){
      socket.emit('admin command', {message: 'play', params:{ startTime: 3000, sequence: sampleShow } });
    }, 1000);
  };

  $scope.$watch('data.toLoad', function() {
      //load the show!
      var newShow = $scope.showList[$scope.data.toLoad];
      if(newShow){
        $scope.currentShow = newShow;
        console.log(newShow);
        SequenceHandler.loadSequence(newShow);

      }

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
};
