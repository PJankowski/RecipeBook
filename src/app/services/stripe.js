(function() {
    'use strict';

    angular.module('Recipes')
        .factory('StripeSrvc', ['$q', '$http', 'stripe',
            function($q, $http, stripe) {
                return {
                    getPlans: function() {
                        var deferred = $q.defer();

                        $http.get('/api/stripe/plans')
                            .success(function(plans) {
                                deferred.resolve(plans);
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