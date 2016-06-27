app.factory('PhotoEventFactory', function($http, $rootScope, ipAddressFactory, socket){

  var inProgress = false;
  var currShow = null;
  var showList = null;

  socket.on('photo process done', function(data){

    var photoIP = ipAddressFactory.getPhotoIP();
    for (var i = 0; i < data.length; i++) {
      data[i].mosaicURL = photoIP + data[i].mosaicURL;
    }
    console.log('new list', data);
    showList = data;
    console.log('new list', showList);

    $rootScope.$broadcast('photo event update', showList);
  });

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
    },
    getList: function(){
      return showList;
    },
    getById: function(id){
      return showList[id];
    }
  };

});
