clientApp.controller('MosaicsController', function($scope, $state, $location, $stateParams) {
$scope.mosaicName_URL = $stateParams.data;
// console.log('data inside controller', $stateParams.data);

$scope.openMosaic = function (url) {
    
        var newwindow = window.open(url,'_blank','location=no');
        newwindow.addEventListener('exit', function(){
          $state.go('stagingPage');

        });

    };



});//endcontroller
