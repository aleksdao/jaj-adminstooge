clientApp.controller('LoginController', function ($scope, $state, socket, $state) {

  var myTwitterToken;
  var twitterKey = 'STORAGE.TWITTER.KEY';
  var clientId = 'rMkOV182Kn9JR6uLSGb7hOnoF';
  var clientSecret = 'gIkO3kxjzCANbdRyWflMoy98r1kyabeX55FaAIUF2DkE9snJ81';

  $scope.data = {name:''};

  $scope.logIn = function(){


    socket.emit('add user', { name: $scope.data.name });
    $state.go('stagingPage');


  };

  $scope.isLoggedIntoTwitter = false;

  $scope.logIntoTwitter = function () {
    TwitterFactory.logIntoTwitter()
    .then(function (data) {
      socket.emit('add user', { name: data.screen_name });
      $scope.isLoggedIntoTwitter = true;
      $state.go('stagingPage');

    })

  }




});
