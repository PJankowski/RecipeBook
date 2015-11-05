(function() {
    'use strict';

    angular.module('Recipes', ['ui.router', 'firebase', 'Postman'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider) {

                $urlRouterProvider.otherwise('/');
                $locationProvider.html5Mode(true);

                $stateProvider
                    .state('recipes', {
                        url: '/recipes',
                        templateUrl: '/app/partials/recipes.html',
                        controller: 'RecipesCtrl',
                        onEnter: ['$state', '$rootScope', 'Auth',
                            function($state, $rootScope, Auth) {
                                if (Auth.isLoggedIn()) {
                                    $rootScope.state = 'recipes';
                                    return true;
                                } else {
                                    $rootScope.state = '';
                                    $state.go('home');
                                }
                            }
                        ]
                    })
                    .state('menu', {
                        url: '/menu',
                        templateUrl: '/app/partials/menu.html',
                        controller: 'MenuCtrl',
                        onEnter: ['$state', '$rootScope', 'Auth',
                            function($state, $rootScope, Auth) {
                                if (Auth.isLoggedIn()) {
                                    $rootScope.state = 'menu';
                                    return true;
                                } else {
                                    $rootScope.state = '';
                                    $state.go('home');
                                }
                            }
                        ]
                    })
                    .state('shopping', {
                        url: '/shopping',
                        templateUrl: '/app/partials/shopping.html',
                        controller: 'ShoppingCtrl',
                        onEnter: ['$state', '$rootScope', 'Auth',
                            function($state, $rootScope, Auth) {
                                if (Auth.isLoggedIn()) {
                                    $rootScope.state = 'shopping';
                                    return true;
                                } else {
                                    $rootScope.state = '';
                                    $state.go('home');
                                }
                            }
                        ]
                    })
                    .state('home', {
                        url: '/',
                        templateUrl: '/app/partials/home.html',
                        controller: 'AuthCtrl',
                        onEnter: ['$state', 'Auth',
                            function($state, Auth) {
                                if (Auth.isLoggedIn()) {
                                    $rootScope.state = 'recipes';
                                    $state.go('recipes');
                                } else {
                                    return true;
                                }
                            }
                        ]
                    });

            }
        ])
        .run(['$rootScope', '$state', '$timeout', 'Auth',
            function($rootScope, $state, $timeout, Auth) {

                if(Auth.isLoggedIn()) {
                  return true;
                } else {
                  $state.go('recipes');
                }

                $rootScope.logout = function() {
                  Auth.logUserOut()
                    .then(function(){
                      $rootScope.user = null;
                      $state.go('home');
                    });
                };
            }
        ])
        .constant('FIREBASE_URL', 'https://bookofrecipesstaging.firebaseio.com/');
})();
