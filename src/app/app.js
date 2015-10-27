(function() {
    'use strict';

    angular.module('Recipes', ['ui.router', 'firebase'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider) {

                $urlRouterProvider.otherwise('/home');
                $locationProvider.html5Mode(true);

                $stateProvider
                    .state('recipes', {
                        url: '/',
                        templateUrl: '/app/partials/recipes.html',
                        controller: 'RecipesCtrl',
                        onEnter: ['$state', 'Auth',
                            function($state, Auth) {
                                if (Auth.isLoggedIn()) {
                                    return true;
                                } else {
                                    $state.go('home');
                                }
                            }
                        ]
                    })
                    .state('menu', {
                        url: '/menu',
                        templateUrl: '/app/partials/menu.html',
                        controller: 'MenuCtrl',
                        onEnter: ['$state', 'Auth',
                            function($state, Auth) {
                                if (Auth.isLoggedIn()) {
                                    return true;
                                } else {
                                    $state.go('home');
                                }
                            }
                        ]
                    })
                    .state('shopping', {
                        url: '/shopping',
                        templateUrl: '/app/partials/shopping.html',
                        controller: 'ShoppingCtrl',
                        onEnter: ['$state', 'Auth',
                            function($state, Auth) {
                                if (Auth.isLoggedIn()) {
                                    return true;
                                } else {
                                    $state.go('home');
                                }
                            }
                        ]
                    })
                    .state('home', {
                        url: '/home',
                        templateUrl: '/app/partials/home.html',
                        controller: 'HomeCtrl',
                        onEnter: ['$state', 'Auth',
                            function($state, Auth) {
                                if (Auth.isLoggedIn()) {
                                    $state.go('recipes');
                                } else {
                                    return true;
                                }
                            }
                        ]
                    });

            }
        ])
        .run(['$rootScope', '$state', 'Auth',
            function($rootScope, $state, Auth) {

                // Auth.signIn({
                //     email: 'PJankowski25@gmail.com',
                //     password: 'Payton15'
                // })
                //     .then(function(user) {
                //         $rootScope.user = user;
                //     });
                
                if(Auth.isLoggedIn()) {
                  return true;
                } else {
                  $state.go('home');
                }

                $rootScope.logout = function() {
                  Auth.logUserOut();
                };

                $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                    $rootScope.state = toState.name;
                });
            }
        ]);
})();