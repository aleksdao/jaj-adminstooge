clientApp.controller('StagingController', function ($scope, $state, socket, SequenceHandler, $timeout) {

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

      window.plugins.toast.showWithOptions({
        message: data.text,
        duration: data.duration, // 2000 ms
        position: "center",
        styling: {
            textSize: 30 // Default is approx. 13.
            }
      });

    }

  });

});
