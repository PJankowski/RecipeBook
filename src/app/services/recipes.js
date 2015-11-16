(function() {
    'use strict';

    angular.module('Recipes')
        .factory('Recipe', ['$firebaseArray', '$q', '$rootScope', 'FIREBASE_URL',
            function($firebaseArray, $q, $rootScope, FIREBASE_URL) {
                var ref = new Firebase(FIREBASE_URL + '/recipes');
                var recipes = $firebaseArray(ref);

                return {
                    getRecipes: function() {
                        return recipes;
                    },
                    addNewRecipe: function(rec) {
                        recipes.$add(rec);
                    },
                    updateInMenu: function(index, id) {
                        recipes[index].inMenu = true;
                        recipes[index].menuId = id;

                        var deferred = $q.defer();
                        recipes.$save(index).then(function() {
                            deferred.resolve(true);
                        });
                        return deferred.promise;
                    },
                    removeMenu: function(index) {
                        recipes[index].inMenu = false;
                        recipes.$save(index);
                    },
                    removeRecipe: function(recipe) {
                        recipes.$remove(recipe);
                    }
                };
            }
        ]);
})();
