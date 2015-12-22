(function() {
    'use strict';

    angular.module('Recipes', ['ui.router', 'angular-jwt'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider) {

                $urlRouterProvider.otherwise('/login');
                $locationProvider.html5Mode(true);

                $stateProvider
                    .state('recipes', {
                        url: '/recipes',
                        templateUrl: '/app/partials/recipes.html',
                        controller: 'RecipesCtrl',
                        onEnter: ['$rootScope', '$state',
                            function($rootScope, $state) {
                                if (!$rootScope.user) {
                                    $state.go('login');
                                }
                            }
                        ]
                    })
                    .state('menu', {
                        url: '/menu',
                        templateUrl: '/app/partials/menu.html',
                        controller: 'MenuCtrl',
                        onEnter: ['$rootScope', '$state',
                            function($rootScope, $state) {
                                if (!$rootScope.user) {
                                    $state.go('home');
                                }
                            }
                        ]
                    })
                    .state('shopping', {
                        url: '/shopping',
                        templateUrl: '/app/partials/shopping.html',
                        controller: 'ShoppingCtrl',
                        onEnter: ['$rootScope', '$state',
                            function($rootScope, $state) {
                                if (!$rootScope.user) {
                                    $state.go('home');
                                }
                            }
                        ]
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
                        onEnter: ['$rootScope', '$state',
                            function($rootScope, $state) {
                                if ($rootScope.user) {
                                    $state.go('recipes');
                                }
                            }
                        ]
                    })
                    .state('signup', {
                        abstract: true,
                        templateUrl: '/app/partials/auth/signup.html',
                        controller: 'AuthCtrl',
                        onEnter: ['$rootScope', '$state',
                            function($rootScope, $state) {
                                if ($rootScope.user) {
                                    $state.go('recipes');
                                }
                            }
                        ]
                    })
                    .state('signup.account', {
                        url: '/signup',
                        templateUrl: '/app/partials/auth/accountForm.html'
                    });
            }
        ])
        .run(['$state', '$rootScope', 'jwtHelper', '$location', '$window', 'Auth',
            function($state, $rootScope, jwtHelper, $location, $window, Auth) {

                $rootScope.$on('$stateChangeSuccess', function(event){
                    if(!$window.ga) {
                        return;
                    }

                    $window.ga('send', 'pageview', {page: $location.path()});
                });

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

            }
        ]);
})();