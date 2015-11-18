(function() {
    'use strict';

    angular.module('Recipes')
        .controller('ShoppingCtrl', ['$scope', 'Shopping',
            function($scope, Shopping) {
                $scope.title = "Shopping List";

                Shopping.getShoppingList()
                    .then(function(recipes){
                        $scope.list = recipes;
                    }, function(err){
                        console.log(err);
                    });

                $scope.buyItem = function(ingredient, index) {
                    Shopping.buyItem(ingredient, index)
                        .then(function(){
                            ingredient.bought = !ingredient.bought;
                        }, function(err){
                            console.log(err);
                        });
                };
            }
        ]);
})();