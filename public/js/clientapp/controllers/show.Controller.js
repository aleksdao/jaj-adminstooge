clientApp.controller('ShowController', function ($scope, $rootScope, $state, socket, SequenceHandler) {

  $scope.context = Tone.context.state;

  SequenceHandler.init({
      container: '#showPage',
      title:  '#showTitle',
      body: '#showText'
      });

  socket.on('play',function(data){

    if(SequenceHandler.getTransportState() === 'stopped'){
      //play the sequence
      SequenceHandler.queueStart(data.startTime, true);
    }
  });

  $rootScope.$on('show ended', function(){
    $state.go('stagingPage');
  });

});
