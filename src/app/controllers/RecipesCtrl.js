(function() {
    'use strict';

    angular.module('Recipes')
        .controller('RecipesCtrl', ['$scope', 'Recipe', 'Menu', 'Shopping',
            function($scope, Recipe, Menu, Shopping) {
                $scope.title = 'Recipes';
                $scope.newForm = false;

                Recipe.getRecipes()
                    .then(function(recipes){
                        $scope.recipes = recipes;
                    });

                $scope.ingredients = [1];

                $scope.newRecipe = function() {
                    $scope.newForm = !$scope.newForm;
                };

                $scope.addIngredient = function() {
                    var num = $scope.ingredients.length + 1;
                    $scope.ingredients.push(num);
                };

                $scope.addRecipe = function(newRec) {

                    var obj = {
                        title: newRec.title,
                        description: newRec.description
                    };

                    Recipe.addNewRecipe(obj, newRec.ingredients)
                        .then(function(recipe){
                            $scope.recipes.push(recipe);
                            $scope.newRec = '';
                            $scope.newForm = false;
                        }, function(err){
                            console.log(err);
                        });
                };

                $scope.removeRecipe = function(recipe, index) {
                    Recipe.removeRecipe(recipe)
                        .then(function(){
                            $scope.recipes.splice(index, 1);
                        }, function(err){
                            alert(err);
                        });
                };

                $scope.removeIngredient = function(index) {
                    $scope.ingredients.splice(index, 1);
                };

                $scope.addToMenu = function(recipe, index) {
                    Recipe.addToMenu(recipe)
                        .then(function(){
                            recipe.inMenu = true;
                        }, function(err){
                            console.log(err);
                        });
                };

                $scope.removeMenu = function(recipe, index) {
                    Menu.removeFromMenu(recipe)
                        .then(function() {
                            recipe.inMenu = false;
                        }, function(err){
                            console.log(err);
                        });
                };
            }
        ]);
})();