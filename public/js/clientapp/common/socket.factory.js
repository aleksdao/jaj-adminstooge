clientApp.factory('socket', function($rootScope, ipAddressFactory){

  var _socket; //holds our Socket
  var _serverLatency; //current roundtrip time to server
  var _pingProcess;

  return {

    connect: function(serverUrl, namespace){
      _socket = io.connect(serverUrl + namespace);
      this.ping(); //get the inital roundtrip time just in case it doesn't get called later on

    },
    on: function (eventName, callback) {
      _socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(_socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      _socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(_socket, args);
          }
        });
      });
    },
    cleanup: function(){
      _socket.removeAllListeners();
    },
    ping: function(){
      _socket.emit('latency', Date.now(), function(startTime) {
        _serverLatency = Date.now() - startTime;
      });
    },
    startPingRepeat: function(interval){
      interval = interval || 200; //if no interval is passed, set to 200 ms

      if(!_pingProcess)
        _pingProcess = setInterval(this.ping, interval);
    },
    stopPingRepeat: function(){
      clearInterval(_pingProcess);
      _pingProcess = null;
    },
    getLatency: function(){
      return _serverLatency;
    },
    connected: function(){
      if(!_socket)
        return false;

      return _socket.connected;
    }
  };
});
