(function() {
    'use strict';

    angular.module('Recipes')
        .factory('User', ['$firebaseArray', '$firebaseObject', '$q', 'FIREBASE_URL',
            function($firebaseArray, $firebaseObject, $q, FIREBASE_URL) {
                var users, ref = new Firebase(FIREBASE_URL + '/users');
                users = $firebaseArray(ref);

                return {
                  createUser: function(user) {
                    return users.$add(user);
                  },
                  getProfile: function(uid) {
                    return $firebaseObject(ref.child(uid));
                  },
                  getDisplayName: function(uid) {
                    return users.$getRecord(uid).displayName;
                  },
                  all: function() {
                    return users;
                  }
                };

            }
        ]);
})();
