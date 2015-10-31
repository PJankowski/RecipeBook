(function() {
    'use strict';

    angular.module('Recipes')
        .factory('Auth', ['$firebaseAuth', '$q', 'FIREBASE_URL',
            function($firebaseAuth, $q, FIREBASE_URL) {
                var auth, ref = new Firebase(FIREBASE_URL);
                auth = $firebaseAuth(ref);

                // auth.$onAuth(function(authData){
                //   if(authData){
                //     console.log('Logged In');
                //   }else{
                //     console.log('Logged Out');
                //   }
                // });

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
                      auth.createUser(user)
                        .then(function(userData){
                          return auth.$authWithPassword(userData);
                        });
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
                        auth.$unauth();
                    }
                };

            }
        ]);
})();
