/// HOME STATES ///
app.config(function ($stateProvider) {
    $stateProvider.state('livemode', {
        url: '/livemode',
        templateUrl: '/js/live/live.html',
        resolve: {

        },
        controller: 'LiveCtrl'
    });
});

app.controller('LiveCtrl', function($scope, socket){

});
