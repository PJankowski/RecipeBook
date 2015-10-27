(function() {
    'use strict';

    angular.module('Recipes')
        .factory('Auth', ['$firebaseAuth', '$q',
            function($firebaseAuth, $q) {
                var auth, ref = new Firebase('https://bookofrecipes.firebaseio.com');
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