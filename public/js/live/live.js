/// HOME STATES ///
app.config(function ($stateProvider) {
    $stateProvider.state('livemode', {
        url: '/livemode',
        templateUrl: '/js/live/live.html',
        resolve: {
          // sampleShow: function(SequenceHandler){
          //   return SequenceHandler.fetchShow();
          // }
        },
        controller: 'LiveCtrl'
    });
});

/// sample show
var sampleShow = {
  show_length:'1:0:0',
  name: 'Sample Show',
  settings:{
    bpm: 90,
    resolution:'16n',
    time_sig: 4
  },
  events:[
    {time: '0:0:0', action: 'changeColor', params: {color: '#333'}},
    {time: '0:1:0', action: 'changeColor', params: {color: '#111'}},
    {time: '0:2:0', action: 'changeColor', params: {color: '#666'}},
    {time: '0:2:0', action: 'changeText',  params: {target: 'title', text: 'this is the dream...'}},
    {time: '0:2:0', action: 'changeText',  params: {target: 'body', text: 'to eat more waffles', color: '#eba200'}},

    {time: '0:3:0', action: 'changeColor', params: {color: '#888'}},
  ]
};

app.controller('LiveCtrl', function($scope, socket, SequenceHandler){
  $scope.transportState = updateState(SequenceHandler);
  $scope.currentShow = sampleShow;

  socket.startPingRepeat();

  SequenceHandler.init({container: '#previewWindow', title: '#previewTitle', body:'#previewBody'});
  SequenceHandler.loadSequence(sampleShow);

  $scope.restartShow = function(){
    socket.emit('admin command', {message: 'play', params:{ startTime: 3000, sequence: sampleShow } });
  };

  socket.on('play', function(data){
    console.log(socket.getLatency())
    SequenceHandler.queueStart(data.startTime, true);
    $scope.transportState = updateState(SequenceHandler);
  });
});

function updateState(SequenceHandler){
  return SequenceHandler.getTransportState();
}
