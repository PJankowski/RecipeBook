(function() {
    'use strict';

    angular.module('Recipes')
        .controller('HomeCtrl', ['$scope',
            function($scope) {
                $scope.title = 'Home';
            }
        ]);
})();