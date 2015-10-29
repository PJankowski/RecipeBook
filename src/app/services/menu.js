(function() {
    'use strict';

    angular.module('Recipes')
        .factory('Menu', ['$firebaseArray', '$q', 'FIREBASE_URL',
            function($firebaseArray, $q, FIREBASE_URL) {
                var ref = new Firebase(FIREBASE_URL + '/menu');
                var menu = $firebaseArray(ref);

                return {
                    getMenu: function() {
                        return menu;
                    },
                    addToMenu: function(recipe) {
                        console.log(recipe);
                        angular.forEach(recipe.ingredients, function(key, value) {
                            key.bought = false;
                        });
                        var deferred = $q.defer();
                        menu.$add(recipe).then(function(data) {
                            deferred.resolve(data.key());
                        });
                        return deferred.promise;
                    },
                    removeItem: function(recipe) {
                        var item = menu.$getRecord(recipe.menuId);

                        var deferred = $q.defer();
                        menu.$remove(item).then(function() {
                            deferred.resolve(true);
                        });
                        return deferred.promise;
                    },
                    buyIngredient: function(ingredient, item, index) {
                        menu[item].ingredients[index] = ingredient;
                        menu.$save(menu[item]);
                    }
                };
            }
        ]);
})();