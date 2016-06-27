clientApp.controller('cameraController', function($scope, $cordovaCamera, $state, imageFactory, ipAddressFactory, photoType) {
  console.log('photoType in controller', photoType);
  $scope.photoType = photoType;
  var photoIP = ipAddressFactory.getPhotoIP();

  $scope.UploadImage = function() {
    imageFactory.postPhoto($scope.srcImage, photoIP)
    .then(function(result) {
      // Success!
      console.log('file uploaded in controller');
    }, function(err) {
      console.log('file not so uploaded!!!!');
    }, function (progress) {
      // constant progress updates
    });
  };


    $scope.takeImage = function() {
        var options = {
            quality: 80,
            destinationType: Camera.DestinationType.DATA_URL,
            // FILE_URI
            sourceType: Camera.PictureSourceType.CAMERA,
            // allowEdit: true,
            correctOrientation: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 800,
            // targetHeight: 800,
            // popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            // selfie
            // cameraDirection: 1
            // front facing
            cameraDirection: photoType

        };

        $cordovaCamera.getPicture(options)
        .then(function(imageData) {
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
            $scope.UploadImage();
            //move this $state.go into callback inside  imageFactory
            // $state.go('stagingPage');
        }, function(err) {
            // error
        });
    };//end takeImage

});//endcontroller
