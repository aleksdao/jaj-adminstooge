clientApp.controller('StagingController', function ($scope, $state, socket, ngToast, SequenceHandler, $timeout) {

  $scope.context = Tone.context.state;

  SequenceHandler.init({
      container: '#showPage',
      title:  '#showTitle',
      body: '#showText'
      });

  socket.on('send show',function(data){
    SequenceHandler.loadSequence(data.sequence);

    $state.go('showPage');
  });

  socket.on('contest winner', function(data){
    $state.go('contestPage', { message: data });
  });

  socket.on('send message', function(data){
    if(SequenceHandler.getTransportState() === 'stopped'){
      console.log('data', data.text)
      ngToast.create(data.text);
    }

  });

});
