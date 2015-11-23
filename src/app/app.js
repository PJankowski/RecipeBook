(function() {
    'use strict';

    angular.module('Recipes', ['ui.router', 'Postman', 'angular-jwt'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider) {

                $urlRouterProvider.otherwise('/login');
                $locationProvider.html5Mode(true);

                $stateProvider
                    .state('recipes', {
                        url: '/recipes',
                        templateUrl: '/app/partials/recipes.html',
                        controller: 'RecipesCtrl',
                        onEnter: ['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth){
                            if(!$rootScope.user) { $state.go('home'); }
                            if(Auth.isTokenExpired()) { $state.go('home'); }
                        }]
                    })
                    .state('menu', {
                        url: '/menu',
                        templateUrl: '/app/partials/menu.html',
                        controller: 'MenuCtrl',
                        onEnter: ['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth){
                            if(!$rootScope.user) { $state.go('home'); }
                            if(Auth.isTokenExpired()) { $state.go('home'); }
                        }]
                    })
                    .state('shopping', {
                        url: '/shopping',
                        templateUrl: '/app/partials/shopping.html',
                        controller: 'ShoppingCtrl',
                        onEnter: ['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth){
                            if(!$rootScope.user) { $state.go('home'); }
                            if(Auth.isTokenExpired()) { $state.go('home'); }
                        }]
                    })
                    .state('home', {
                        // url: '/',
                        templateUrl: '/app/partials/home.html',
                        controller: 'AuthCtrl'
                    })
                    .state('home.login', {
                        url: '/login',
                        templateUrl: '/app/partials/auth/login.html',
                        controller: 'AuthCtrl'
                    })
                    .state('home.signup', {
                        url: '/signup',
                        templateUrl: '/app/partials/auth/signup.html',
                        controller: 'AuthCtrl'
                    });

            }
        ]);
})();