(function(){
  'use strict';

  angular.module('Recipes')
    .factory('Menu', ['$firebaseArray', '$q', function($firebaseArray, $q){
      var ref = new Firebase('https://bookofrecipes.firebaseio.com/menu');
      var menu = $firebaseArray(ref);

      return {
        getMenu: function() {
          return menu;
        },
        addToMenu: function(recipe) {
          // menu.$add(recipe);
          var deferred = $q.defer();
            menu.$add(recipe).then(function(data){
              deferred.resolve(data.key());
            });
          return deferred.promise;
        },
        removeItem: function(recipe) {
          var item = menu.$getRecord(recipe.menuId);

          var deferred = $q.defer();
          menu.$remove(item).then(function(){
            deferred.resolve(true);
          });
          return deferred.promise;
        }
      };
    }]);
})();