(function() {
    'use strict';

    angular.module('Recipes')
        .factory('Shopping', ['$firebaseArray', '$q', 'FIREBASE_URL',
            function($firebaseArray, $q, FIREBASE_URL) {
                var ref = new Firebase(FIREBASE_URL + '/shoppingList');
                var shoppingList = $firebaseArray(ref);

                return {
                    getItems: function() {
                        return shoppingList;
                    },
                    addToList: function(ingredients) {
                        angular.forEach(ingredients, function(value, key) {
                            shoppingList.$add(value);
                        });
                    }
                };
            }
        ]);
})();