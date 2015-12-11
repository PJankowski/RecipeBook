!function(){"use strict";angular.module("Recipes",["ui.router","Postman","angular-jwt"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,n,t){n.otherwise("/login"),t.html5Mode(!0),e.state("recipes",{url:"/recipes",templateUrl:"/app/partials/recipes.html",controller:"RecipesCtrl",onEnter:["$rootScope","$state",function(e,n){e.user||n.go("login")}]}).state("menu",{url:"/menu",templateUrl:"/app/partials/menu.html",controller:"MenuCtrl",onEnter:["$rootScope","$state",function(e,n){e.user||n.go("home")}]}).state("shopping",{url:"/shopping",templateUrl:"/app/partials/shopping.html",controller:"ShoppingCtrl",onEnter:["$rootScope","$state",function(e,n){e.user||n.go("home")}]}).state("home",{url:"/",templateUrl:"/app/partials/home.html",controller:"AuthCtrl"}).state("login",{url:"/login",templateUrl:"/app/partials/auth/login.html",controller:"AuthCtrl",onEnter:["$rootScope","$state",function(e,n){e.user&&n.go("recipes")}]}).state("signup",{"abstract":!0,templateUrl:"/app/partials/auth/signup.html",controller:"AuthCtrl",onEnter:["$rootScope","$state",function(e,n){e.user&&n.go("recipes")}]}).state("signup.account",{url:"/signup",templateUrl:"/app/partials/auth/accountForm.html"})}]).run(["$state","$rootScope","jwtHelper","$location","$window","Auth",function(e,n,t,o,r,i){n.$on("$stateChangeSuccess",function(e){r.ga&&r.ga("send","pageview",{page:o.path()})});var c=i.getToken();if(c&&!i.isTokenExpired()){var u=t.decodeToken(c);n.user=u,e.go("recipes")}else e.go("login");n.logout=function(){i.logout().then(function(){e.go("login")},function(e){console.log(e)})}}])}(),function(){"use strict";angular.module("Recipes").factory("Auth",["$q","$http","$window","$rootScope","jwtHelper",function(e,n,t,o,r){return{login:function(o){var r=e.defer();return n.post("/api/login",o).success(function(e){t.localStorage.jwt=e,r.resolve(e)}).error(function(e){r.reject(e)}),r.promise},signup:function(o){var r=e.defer();return n.post("/api/signup",o).success(function(e){t.localStorage.jwt=e,r.resolve(e)}).error(function(e){r.reject(e)}),r.promise},logout:function(){var r=e.defer();return n.post("/api/logout").success(function(){o.user=null,t.localStorage.clear("jwt"),r.resolve(!0)}).error(function(e){r.reject(e)}),r.promise},getToken:function(){return t.localStorage.jwt},isTokenExpired:function(){return r.isTokenExpired(t.localStorage.jwt)}}}])}(),function(){"use strict";angular.module("Recipes").factory("Recipe",["$http","$q","$rootScope",function(e,n,t){return{getRecipes:function(){var t=n.defer();return e.get("/api/recipes").success(function(e){t.resolve(e)}).error(function(e){t.reject(e)}),t.promise},addNewRecipe:function(t,o){var r=n.defer();return e.post("/api/recipes",{recipe:t,ingredients:o}).success(function(e){r.resolve(e)}).error(function(e){r.reject(e)}),r.promise},addToMenu:function(t){var o=n.defer();return e.put("/api/recipes/menu",t).success(function(e){o.resolve(e)}).error(function(e){o.reject(e)}),o.promise},removeRecipe:function(t){var o=n.defer();return e["delete"]("/api/recipes/"+t._id).success(function(){o.resolve(!0)}).error(function(e){o.reject(e)}),o.promise}}}])}(),function(){"use strict";angular.module("Recipes").factory("Menu",["$q","$http",function(e,n){return{getMenu:function(){var t=e.defer();return n.get("/api/recipes/menu").success(function(e){t.resolve(e)}).error(function(e){t.reject(e)}),t.promise},removeFromMenu:function(t){var o=e.defer();return n.put("/api/recipes/menu/remove",t).success(function(e){o.resolve(e)}).error(function(e){o.reject(e)}),o.promise}}}])}(),function(){"use strict";angular.module("Recipes").factory("Shopping",["$q","$http",function(e,n){return{getShoppingList:function(){var t=e.defer();return n.get("/api/recipes/shopping").success(function(e){t.resolve(e)}).error(function(e){t.reject(e)}),t.promise},buyItem:function(t){var o=e.defer();return n.put("/api/recipes/item",t).success(function(e){o.resolve(e)}).error(function(e){o.rejet(e)}),o.promise}}}])}(),function(){"use strict";angular.module("Recipes").controller("AuthCtrl",["$scope","$rootScope","$window","$state","jwtHelper","Auth",function(e,n,t,o,r,i){e.title="Welcome",e.rememberMe=!1,e.login=function(t){i.login(t).then(function(){var e=i.getToken(),t=r.decodeToken(e);n.user=t,o.go("recipes")},function(n){e.loginError=n})},e.signup=function(e){i.signup(e).then(function(e){var t=r.decodeToken(e);n.user=t,o.go("recipes")},function(e){console.log(JSON.stringify(e))})},e.checkRemember=function(){e.rememberMe=!e.rememberMe}}])}(),function(){"use strict";angular.module("Recipes").controller("RecipesCtrl",["$scope","Recipe","Menu","Shopping",function(e,n,t,o){e.title="Recipes",e.newForm=!1,n.getRecipes().then(function(n){e.recipes=n}),e.ingredients=[1],e.newRecipe=function(){e.newForm=!e.newForm},e.addIngredient=function(){var n=e.ingredients.length+1;e.ingredients.push(n)},e.addRecipe=function(t){var o={title:t.title,description:t.description};n.addNewRecipe(o,t.ingredients).then(function(n){e.recipes.push(n),e.newRec="",e.newForm=!1},function(e){console.log(e)})},e.removeRecipe=function(t,o){n.removeRecipe(t).then(function(){e.recipes.splice(o,1)},function(e){alert(e)})},e.removeIngredient=function(n){e.ingredients.splice(n,1)},e.addToMenu=function(e,t){n.addToMenu(e).then(function(){e.inMenu=!0},function(e){console.log(e)})},e.removeMenu=function(e,n){t.removeFromMenu(e).then(function(){e.inMenu=!1},function(e){console.log(e)})}}])}(),function(){"use strict";angular.module("Recipes").controller("MenuCtrl",["$scope","Menu",function(e,n){e.title="Menu",n.getMenu().then(function(n){e.menu=n},function(e){console.log(e)})}])}(),function(){"use strict";angular.module("Recipes").controller("ShoppingCtrl",["$scope","Shopping",function(e,n){e.title="Shopping List",n.getShoppingList().then(function(n){e.list=n},function(e){console.log(e)}),e.buyItem=function(e,t){n.buyItem(e,t).then(function(){e.bought=!e.bought},function(e){console.log(e)})}}])}();