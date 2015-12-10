(function(){
  'use strict';

  angular.module('Recipes')
    .controller('AuthCtrl', ['$scope', '$rootScope', '$window', '$state', 'jwtHelper', 'Auth', 'StripeSrvc', function($scope, $rootScope, $window, $state, jwtHelper, Auth, StripeSrvc){
      $scope.title = 'Welcome';

      $scope.formData = {};

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
        $scope.formData = user;          
        $state.go('signup.plans');
      };

      $scope.choosePlan = function(plan) {
        $scope.formData.plan = plan;
        $state.go('signup.success');

        // Auth.signup(user)
        //   .then(function(newUser){
        //     var token = Auth.getToken();

        //     var payload = jwtHelper.decodeToken(token);

        //     $rootScope.user = payload;

        //     $state.go('signup.success');

        //   }, function(err){
        //     alert(err);
        //   });
      };

      $scope.checkRemember = function() {
        $scope.rememberMe = !$scope.rememberMe;
      };
    }]);
})();
