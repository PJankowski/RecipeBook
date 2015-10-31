(function(){
  'use strict';

  angular.module('Recipes')
    .controller('AuthCtrl', ['$scope', '$rootScope', '$state', 'Auth', function($scope, $rootScope, $state, Auth){
      $scope.title = 'Welcome';

      $scope.login = function(user) {
        Auth.signIn(user)
          .then(function(data){
            $rootScope.user = data;
            $state.go('recipes');
          });
      };

      $scope.signup = function(user) {
        Auth.signup(user)
          .then(function(){
            $state.go('recipes');
          });
      };
    }]);
})();
