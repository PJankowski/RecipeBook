(function(){
  'use strict';

  angular.module('Recipes')
    .controller('AuthCtrl', ['$scope', '$rootScope', '$state', '$window', 'jwtHelper', 'Auth', function($scope, $rootScope, $state, $window, jwtHelper, Auth){
      $scope.title = 'Welcome';

      $scope.login = function(user) {
        Auth.login(user)
          .then(function(){
            var token = Auth.getToken();

            var payload = jwtHelper.decodeToken(token);
            $rootScope.user = payload;

            $state.go('recipes');

          });
      };

      $scope.signup = function(user) {
        Auth.signup(user)
          .then(function(newUser){
            console.log(newUser);
          }, function(err){
            console.log(err);
          });
      };
    }]);
})();
