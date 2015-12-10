(function(){
  'use strict';

  angular.module('Recipes')
    .controller('AuthCtrl', ['$scope', '$rootScope', '$window', '$state', 'jwtHelper', 'Auth', 'StripeSrvc', function($scope, $rootScope, $window, $state, jwtHelper, Auth, StripeSrvc){
      $scope.title = 'Welcome';

      StripeSrvc.getPlans()
        .then(function(plans){
          $scope.plans = plans;
        }, function(err){
          console.log(err);
        });

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
        // Auth.signup(user)
        //   .then(function(newUser){
        //     var token = Auth.getToken();

        //     var payload = jwtHelper.decodeToken(token);

        //     $rootScope.user = payload;

        //     $state.go('recipes');

        //   }, function(err){
        //     $scope.signUpErr = err;
        //   });
        //   
        $state.go('signup.plans');
      };

      $scope.checkRemember = function() {
        $scope.rememberMe = !$scope.rememberMe;
      };
    }]);
})();
