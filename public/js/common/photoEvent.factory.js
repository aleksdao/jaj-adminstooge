app.factory('PhotoEventFactory', function($http, ipAddressFactory){

  var inProgress = false;
  var currShow = null;

  return {

    startPhotoEvent: function(showName){

      if(!showName)
        showName = "Show" + Date.now();

      if(inProgress)
        return;

      inProgress = true;
      currShow = showName;

      return $http.post(ipAddressFactory.getPhotoIP()+'/api/photo/initPhotoShow', {token: 'bootsNCats', photoEventName: showName})
      .then(function(res){
        console.log('result', res.data);

      });

    },
    processPhotoEvent: function(){

      return $http.post(ipAddressFactory.getPhotoIP()+'/api/photo/processPhotoShow', {token: 'bootsNCats'})
      .then(function(res){
        console.log('result', res.data);

      });

    },
    getStatus: function(){
      return inProgress;
    },
    getName: function(){
      return currShow;
    }
  };

});
