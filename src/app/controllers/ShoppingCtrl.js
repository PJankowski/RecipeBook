(function(){
  'use strict';

  angular.module('Recipes')
    .controller('ShoppingCtrl', ['$scope', 'Shopping', 'Menu', function($scope, Shopping, Menu){
      $scope.title = "Shopping List";

      $scope.list = Menu.getMenu();
      console.log($scope.list);
    }]);
})();