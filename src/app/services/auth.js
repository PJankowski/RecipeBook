(function() {
    'use strict';

    angular.module('Recipes')
        .factory('Auth', ['$q', '$http', '$window',
            function($q, $http, $window) {

                return {
                    login: function (user) {
                        var deferred = $q.defer();

                        $http.post('/api/login', user)
                            .success(function(token){
                                $window.localStorage['jwt'] = token;
                                deferred.resolve(token);
                            })
                            .error(function(err){
                                deferred.reject(err);
                            });

                        return deferred.promise;
                    },
                    signup: function(user) {
                        var deferred = $q.defer();

                        $http.post('/api/signup', user)
                            .success(function(newUser){
                                deferred.resolve(newUser);
                            })
                            .error(function(err){
                                deferred.reject(err);
                            });

                        return deferred.promise;
                    },
                    getToken: function() {
                        return $window.localStorage['jwt'];
                    }
                };
            }
        ]);
})();