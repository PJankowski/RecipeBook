(function(){
  'use strict';

  angular.module('Recipes')
    .controller('ShoppingCtrl', ['$scope', 'Shopping', 'Menu', function($scope, Shopping, Menu){
      $scope.title = "Shopping List";

      $scope.list = Menu.getMenu();
      
      $scope.buyItem = function(ingredient, item, index) {
        ingredient.bought = !ingredient.bought;

        Menu.buyIngredient(ingredient, item, index);
      };
    }]);
})();