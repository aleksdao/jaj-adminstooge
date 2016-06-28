clientApp.controller('ErrorController', function($scope, $interval, $state, socket, ipAddressFactory){

  // $state.go('stagingPage');

  if(socket.connected()){
    $state.go('login');
  }

  var counter = 0;

  //set up an interval to check connection status
  var checkServer = $interval(function(){

    if(counter === 10){
      //reset counter
      counter = 0;
      //check to see if the server's IP changed
      ipAddressFactory.fetchIpAddresses()
      .then(function(){
        socket.connect(ipAddressFactory.getSocketIP(), '/client');
        if(socket.connected()){
           $interval.cancel(checkServer);
           $state.go('login');
        }
      });

    } else{
      if(socket.connected()){
         $interval.cancel(checkServer);
         $state.go('login');
      }
    }

    counter++;

  }, 1000);

});
