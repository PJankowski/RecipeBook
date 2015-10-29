(function(){
  'use strict';

  angular.module('Recipes')
    .controller('AuthCtrl', ['$scope', 'Auth', function($scope, Auth){
      $scope.title = 'Welcome';

      $scope.login = function() {

      };

      $scope.signup = function() {

      };
    }]);
})();