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
  show_length:'1:0:0',
  settings:{
    bpm: 90,
    resolution:'16n',
    time_sig: 4
  },
  events:[
    {time: '0:0:0', action: 'changeColor', params: {color: '#333'}},
    {time: '0:1:0', action: 'changeColor', params: {color: '#111'}},
    {time: '0:2:0', action: 'changeColor', params: {color: '#666'}},
    {time: '0:3:0', action: 'changeColor', params: {color: '#888'}},
  ]
};

app.controller('LiveCtrl', function($scope, socket, SequenceHandler){
  $scope.transportState = SequenceHandler.getTransportState();
  SequenceHandler.init({container: '#previewWindow', title: '#previewBody', body:'#previewBody'});
  SequenceHandler.loadSequence(sampleShow);

  $scope.restartShow = function(){
    SequenceHandler.queueStart(0);
  };
});
