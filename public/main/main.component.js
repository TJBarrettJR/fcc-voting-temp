angular.module('main').component('main', {
  template: 
    '<div>' +
      '{{user}}' +
    '</div>' +
    '<button type="submit" class="btn btn-primary" ng-click="createUser()">' +
      'Add' +
    '</button>',
  controller: function mainController($scope, $http) {
    $scope.formData = {};

    $scope.user = {worked: true};
    
    /*$http.get('/api/users')
      .success(function(data) {
        $scope.user = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error ' + data);
      });

    $scope.createUser = function() {
      $http.post('/api/users')
        .success(function(data) {
          $scope.user = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };*/
  }
});