(function(){
  'use strict';

  angular.module('Recipes')
    .controller('AuthCtrl', ['$scope', '$rootScope', '$window', '$state', 'jwtHelper', 'Auth', function($scope, $rootScope, $window, $state, jwtHelper, Auth){
      $scope.title = 'Welcome';

      $scope.rememberMe = false;

      $scope.login = function(user) {
        Auth.login(user)
          .then(function(){
            var token = Auth.getToken();

            var payload = jwtHelper.decodeToken(token);

            $rootScope.user = payload;

            $state.go('recipes');

          }, function(err) {
            $scope.loginError = err;
          });
      };

      $scope.signup = function(user) {
        Auth.signup(user)
          .then(function(token){
            var payload = jwtHelper.decodeToken(token);

            $rootScope.user = payload;

            $state.go('recipes');

          }, function(err){
            console.log(JSON.stringify(err));
          });
      };

      $scope.checkRemember = function() {
        $scope.rememberMe = !$scope.rememberMe;
      };
    }]);
})();
