(function(){
  'use strict';

  angular.module('Recipes')
    .controller('RecipesCtrl', ['$scope', 'Recipe', 'Menu', 'Shopping', function($scope, Recipe, Menu, Shopping){
      $scope.title = 'Recipes';
      $scope.newForm = false;

      $scope.recipes = Recipe.getRecipes();
      $scope.ingredients = [1];

      $scope.newRecipe = function() {
        $scope.newForm = !$scope.newForm;
      };

      $scope.addIngredient = function() {
        var num = $scope.ingredients.length + 1;
        $scope.ingredients.push(num);
      };

      $scope.addRecipe = function(newRec) {
        Recipe.addNewRecipe(newRec);
        $scope.newRec = '';
        $scope.newForm = false;
      };

      $scope.removeRecipe = function(recipe) {
        Recipe.removeRecipe(recipe);
      };

      $scope.removeIngredient = function(index) {
        $scope.ingredients.splice(index, 1);
      };

      $scope.addToMenu = function(recipe, index) {
        recipe.inMenu = true;

        Menu.addToMenu(recipe)
          .then(function(id){
            Recipe.updateInMenu(index, id);
          });
      };

      $scope.removeMenu = function(recipe, index) {
        Menu.removeItem(recipe)
          .then(function(){
            Recipe.removeMenu(index);
          });
      };
    }]);
})();