(function() {
    'use strict';

    angular.module('Recipes')
        .factory('Menu', ['$q', '$http',
            function($q, $http) {

                return {
                    getMenu: function() {
                        var deferred = $q.defer();

                        $http.get('/api/recipes/menu')
                            .success(function(recipes) {
                                deferred.resolve(recipes);
                            })
                            .error(function(err) {
                                deferred.reject(err);
                            });

                        return deferred.promise;
                    },
                    removeFromMenu: function(recipe) {
                        var deferred = $q.defer();

                        $http.put('/api/recipes/menu/remove', recipe)
                            .success(function(data) {
                                deferred.resolve(data);
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