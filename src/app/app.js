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
                            if(Auth.getToken()) {
                                if(!Auth.isTokenExpired()) { $state.go('recipes'); }
                            }
                        }]
                    })
                    .state('menu', {
                        url: '/menu',
                        templateUrl: '/app/partials/menu.html',
                        controller: 'MenuCtrl',
                        onEnter: ['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth){
                            if(!$rootScope.user) { $state.go('home'); }
                            if(Auth.getToken()) {
                                if(!Auth.isTokenExpired()) { $state.go('recipes'); }
                            }
                        }]
                    })
                    .state('shopping', {
                        url: '/shopping',
                        templateUrl: '/app/partials/shopping.html',
                        controller: 'ShoppingCtrl',
                        onEnter: ['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth){
                            if(!$rootScope.user) { $state.go('home'); }
                            if(Auth.getToken()) {
                                if(!Auth.isTokenExpired()) { $state.go('recipes'); }
                            }
                        }]
                    })
                    .state('home', {
                        url: '/',
                        templateUrl: '/app/partials/home.html',
                        controller: 'AuthCtrl'
                    })
                    .state('login', {
                        url: '/login',
                        templateUrl: '/app/partials/auth/login.html',
                        controller: 'AuthCtrl',
                        onEnter: ['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth){
                            if($rootScope.user) { $state.go('recipes'); }
                            if(Auth.getToken()) {
                                if(!Auth.isTokenExpired()) { $state.go('recipes'); }
                            }
                        }]
                    })
                    .state('signup', {
                        url: '/signup',
                        templateUrl: '/app/partials/auth/signup.html',
                        controller: 'AuthCtrl',
                        onEnter: ['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth){
                            if($rootScope.user) { $state.go('recipes'); }
                            if(Auth.getToken()) {
                                if(!Auth.isTokenExpired()) { $state.go('recipes'); }
                            }
                        }]
                    });

            }
        ])
        .run(['$state', '$rootScope', 'jwtHelper', 'Auth', function($state, $rootScope, jwtHelper, Auth){
            var token = Auth.getToken();

            if (token && !Auth.isTokenExpired()) {
                var payload = jwtHelper.decodeToken(token);
                $rootScope.user = payload;
                $state.go('recipes');
            } else {
                $state.go('login');
            }

            $rootScope.logout = function() {
                Auth.logout()
                    .then(function() {
                        $state.go('login');
                    }, function(err) {
                        console.log(err);
                    });
            };

        }]);
})();