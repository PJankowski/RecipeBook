(function() {
    'use strict';

    angular.module('Recipes')
        .factory('Recipe', ['$http', '$q',
            function($http, $q) {

                return {
                    getRecipes: function() {
                        var deferred = $q.defer();

                        $http.get('/api/recipes')
                            .success(function(recipes){
                                deferred.resolve(recipes);
                            })
                            .error(function(err){
                                deferred.reject(err);
                            });

                        return deferred.promise;
                    },
                    addNewRecipe: function(recipe, ingredients) {
                        var deferred = $q.defer();

                        $http.post('/api/recipes', {recipe: recipe, ingredients: ingredients})
                            .success(function(newRecipe){
                                deferred.resolve(newRecipe);
                            })
                            .error(function(err){
                                deferred.reject(err);
                            });

                        return deferred.promise;
                    },
                    removeRecipe: function(recipe) {
                        var deferred = $q.defer();

                        $http.delete('/api/recipe/' + recipe._id)
                            .success(function(){
                                deferred.resolve(true);
                            })
                            .error(function(err){
                                deferred.reject(err);
                            });

                        return deferred.promise;
                    }
                };
            }
        ]);
})();
