(function(){
  'use strict';

  angular.module('Recipes')
    .controller('AuthCtrl', ['$scope', '$rootScope', '$state', 'Auth', 'User', function($scope, $rootScope, $state, Auth, User){
      $scope.title = 'Welcome';

      $scope.login = function(user) {
        Auth.signIn(user)
          .then(function(data){
            $rootScope.user = data;
            $state.go('recipes');
          });
      };

      $scope.signup = function(user) {
        Auth.signUp(user)
          .then(function(uuid){
            User.createUser(uuid)
              .then(function(){
                Auth.signIn(user)
                  .then(function(data){
                    $rootScope.user = data;
                    $state.go('recipes');
                  });
              });
          });
      };
    }]);
})();
