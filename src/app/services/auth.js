(function() {
    'use strict';

    angular.module('Recipes')
        .factory('Auth', ['$q', '$http', '$window', '$rootScope', 'jwtHelper',
            function($q, $http, $window, $rootScope, jwtHelper) {

                return {
                    login: function (user) {
                        var deferred = $q.defer();

                        $http.post('/api/login', user)
                            .success(function(token){
                                $window.localStorage.jwt = token;
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
                            .success(function(token){
                                $window.localStorage.jwt = token;
                                deferred.resolve(token);
                            })
                            .error(function(err){
                                deferred.reject(err);
                            });

                        return deferred.promise;
                    },
                    logout: function() {

                        var deferred = $q.defer();

                        $http.post('/api/logout')
                            .success(function(){

                                $rootScope.user = null;
                                $window.localStorage.clear('jwt');

                                deferred.resolve(true);
                            })
                            .error(function(err){

                                deferred.reject(err);
                                
                            });

                        return deferred.promise;
                    },
                    getToken: function() {
                        return $window.localStorage.jwt;
                    },
                    isTokenExpired: function() {
                        return jwtHelper.isTokenExpired($window.localStorage.jwt);
                    }
                };
            }
        ]);
})();