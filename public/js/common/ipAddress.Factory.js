app.factory('ipAddressFactory', function ($http) {
  var socketIP;
  var photoIP;

  return {

    fetchIpAddresses: function()  {
      return $http.get('https://nsync-dns.herokuapp.com/')
      .then(function(response){
        photoIP = 'http://' + response.data.photoIP;
        socketIP = 'http://' + response.data.socketIP;
        return response;
      });
    },
    getPhotoIP: function()  {
      return photoIP;
    },
    getSocketIP: function(){
      return socketIP;
    }
  };
});
