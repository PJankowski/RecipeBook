(function() {
    'use strict';

    angular.module('Recipes')
        .factory('Recipe', ['$http', '$q', '$rootScope',
            function($http, $q, $rootScope) {

                return {
                    getRecipes: function() {
                        var deferred = $q.defer();

                        $http.get('/api/recipes')
                            .success(function(recipes) {
                                deferred.resolve(recipes);
                            })
                            .error(function(err) {
                                deferred.reject(err);
                            });

                        return deferred.promise;
                    },
                    addNewRecipe: function(recipe, ingredients) {
                        var deferred = $q.defer();

                        $http.post('/api/recipes', {
                            recipe: recipe,
                            ingredients: ingredients
                        })
                            .success(function(newRecipe) {
                                deferred.resolve(newRecipe);
                            })
                            .error(function(err) {
                                deferred.reject(err);
                            });

                        return deferred.promise;
                    },
                    addToMenu: function(recipe) {
                        var deferred = $q.defer();

                        $http.put('/api/recipes/menu', recipe)
                            .success(function(data) {
                                deferred.resolve(data);
                            })
                            .error(function(err) {
                                deferred.reject(err);
                            });

                        return deferred.promise;
                    },
                    removeRecipe: function(recipe) {
                        var deferred = $q.defer();

                        $http.delete('/api/recipes/' + recipe._id)
                            .success(function() {
                                deferred.resolve(true);
                            })
                            .error(function(err) {
                                deferred.reject(err);
                            });

                        return deferred.promise;
                    }
                };
            }
        ]);
})();