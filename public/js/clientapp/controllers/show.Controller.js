clientApp.controller('ShowController', function ($scope, $state, socket, SequenceHandler) {

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

});
