(function() {
    'use strict';

    angular.module('Recipes')
        .factory('Shopping', ['$q', '$http',
            function($q, $http) {
                return {
                    getShoppingList: function() {
                        var deferred = $q.defer();

                        $http.get('/api/recipes/shopping')
                            .success(function(recipes) {
                                deferred.resolve(recipes);
                            })
                            .error(function(err) {
                                deferred.reject(err);
                            });

                        return deferred.promise;
                    },
                    buyItem: function(ingredient) {
                        var deferred = $q.defer();

                        $http.put('/api/recipes/item', ingredient)
                            .success(function(data) {
                                deferred.resolve(data);
                            })
                            .error(function(err) {
                                deferred.rejet(err);
                            });

                        return deferred.promise;
                    }
                };
            }
        ]);
})();