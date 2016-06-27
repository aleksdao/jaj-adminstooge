clientApp.factory('ipAddressFactory', function ($http) {
  var socketIP;
  var photoIP;

  return {

    fetchIpAddresses: function()  {
      return $http.get('https://nsync-dns.herokuapp.com/')
      .then(function(response){
        photoIP = response.data.photoIP;
        socketIP = response.data.socketIP;
        return response;
      });
    },
    getPhotoIP: function()  {
      return 'http://' + photoIP;
    },
    getSocketIP: function(){
      return 'http://' + socketIP;
    },
    updateIP: function(photoIP, socketIP){
      return $http.post('https://nsync-dns.herokuapp.com/photo?photoIP=' + photoIP.slice(7))
      .then(function(){
        return $http.post('https://nsync-dns.herokuapp.com/socket?socketIP=' + socketIP.slice(7));
      });
    }
  };
});
