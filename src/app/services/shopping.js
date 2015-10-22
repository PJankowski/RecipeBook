(function(){
  'use strict';

  angular.module('Recipes')
    .factory('Shopping', ['$firebaseArray', '$q', function($firebaseArray, $q){
      var ref = new Firebase('https://bookofrecipes.firebaseio.com/shoppingList');
      var shoppingList = $firebaseArray(ref);

      return {
        getItems: function() {
          return shoppingList;
        },
        addToList: function(ingredients) {
          angular.forEach(ingredients, function(value, key){
            shoppingList.$add(value);
          });
        }
      };
    }]);
})();