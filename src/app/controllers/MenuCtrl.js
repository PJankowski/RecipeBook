(function() {
    'use strict';

    angular.module('Recipes')
        .controller('MenuCtrl', ['$scope', 'Menu',
            function($scope, Menu) {
                $scope.title = 'Menu';

                Menu.getMenu()
                  .then(function(recipes){
                    $scope.menu = recipes;
                  }, function(err){
                    console.log(err);
                  });

            }
        ]);
})();