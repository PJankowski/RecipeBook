(function() {
    'use strict';

    angular.module('Recipes')
        .factory('Auth', ['$firebaseAuth', '$q', 'FIREBASE_URL',
            function($firebaseAuth, $q, FIREBASE_URL) {
                var auth, ref = new Firebase(FIREBASE_URL);
                auth = $firebaseAuth(ref);

                return {
                    signIn: function(user) {
                        var deferred = $q.defer();

                        auth.$authWithPassword(user)
                            .then(function(loggedUser) {
                                deferred.resolve(loggedUser);
                            }, function(err) {
                                deferred.reject(err);
                            });

                        return deferred.promise;
                    },
                    signUp: function(user) {
                      return auth.$createUser(user);
                    },
                    isLoggedIn: function() {
                      if(auth.$getAuth()) {
                        return true;
                      } else {
                        return false;
                      }
                    },
                    getSignedInUser: function() {
                        return auth.$getAuth();
                    },
                    logUserOut: function() {
                        var deferred = $q.defer();
                        auth.$unauth();
                        deferred.resolve(true);
                        return deferred.promise;
                    }
                };

            }
        ]);
})();
