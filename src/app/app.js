(function(){
  'use strict';

  angular.module('Recipes', ['ui.router', 'firebase'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider){

      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);

      $stateProvider
        .state('recipes', {
          url: '/',
          templateUrl: '/app/partials/recipes.html',
          controller: 'RecipesCtrl'
        })
        .state('menu', {
          url: '/menu',
          templateUrl: '/app/partials/menu.html',
          controller: 'MenuCtrl'
        })
        .state('shopping', {
          url: '/shopping',
          templateUrl: '/app/partials/shopping.html',
          controller: 'ShoppingCtrl'
        });

    }])
    .run(['$rootScope', function($rootScope){
      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $rootScope.state = toState.name;
      });
    }]);
})();