(function() {
    'use strict';

    angular.module('Recipes', ['ui.router', 'Postman', 'angular-jwt'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider) {

                $urlRouterProvider.otherwise('/');
                $locationProvider.html5Mode(true);

                $stateProvider
                    .state('recipes', {
                        url: '/recipes',
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
                    })
                    .state('home', {
                        url: '/',
                        templateUrl: '/app/partials/home.html',
                        controller: 'AuthCtrl'
                    });

            }
        ]);
})();
