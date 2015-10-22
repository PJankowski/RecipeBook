(function(){
  'use strict';

  angular.module('Recipes')
    .controller('MenuCtrl', ['$scope', 'Menu', function($scope, Menu){
      $scope.title = 'Menu';

      $scope.menu = Menu.getMenu();

    }]);
})();