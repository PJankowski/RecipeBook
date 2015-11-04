!function(){"use strict";angular.module("Recipes",["ui.router","firebase"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,n,t){n.otherwise("/home"),t.html5Mode(!0),e.state("recipes",{url:"/",templateUrl:"/app/partials/recipes.html",controller:"RecipesCtrl",onEnter:["$state","$rootScope","Auth",function(e,n,t){return t.isLoggedIn()?!0:(n.state="",void e.go("home"))}]}).state("menu",{url:"/menu",templateUrl:"/app/partials/menu.html",controller:"MenuCtrl",onEnter:["$state","$rootScope","Auth",function(e,n,t){return t.isLoggedIn()?!0:(n.state="",void e.go("home"))}]}).state("shopping",{url:"/shopping",templateUrl:"/app/partials/shopping.html",controller:"ShoppingCtrl",onEnter:["$state","$rootScope","Auth",function(e,n,t){return t.isLoggedIn()?!0:(n.state="",void e.go("home"))}]}).state("home",{url:"/home",templateUrl:"/app/partials/home.html",controller:"AuthCtrl",onEnter:["$state","Auth",function(e,n){return n.isLoggedIn()?void e.go("recipes"):!0}]})}]).run(["$rootScope","$state","$timeout","Auth",function(e,n,t,r){return r.isLoggedIn()?!0:(n.go("home"),e.logout=function(){r.logUserOut()},void e.$on("$stateChangeSuccess",function(n,t,r,o,i){e.state=t.name}))}]).constant("FIREBASE_URL","https://bookofrecipesstaging.firebaseio.com/")}(),function(){"use strict";angular.module("Recipes").factory("Auth",["$firebaseAuth","$q","FIREBASE_URL",function(e,n,t){var r,o=new Firebase(t);return r=e(o),{signIn:function(e){var t=n.defer();return r.$authWithPassword(e).then(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},signUp:function(e){return r.$createUser(e)},isLoggedIn:function(){return r.$getAuth()?!0:!1},getSignedInUser:function(){return r.$getAuth()},logUserOut:function(){r.$unauth()}}}])}(),function(){"use strict";angular.module("Recipes").factory("User",["$firebaseArray","$firebaseObject","$q","FIREBASE_URL",function(e,n,t,r){var o,i=new Firebase(r+"/users");return o=e(i),{createUser:function(e){return o.$add(e)},getProfile:function(e){return n(i.child(e))},getDisplayName:function(e){return o.$getRecord(e).displayName},all:function(){return o}}}])}(),function(){"use strict";angular.module("Recipes").factory("Recipe",["$firebaseArray","$q","FIREBASE_URL",function(e,n,t){var r=new Firebase(t+"/recipes"),o=e(r);return{getRecipes:function(){return o},addNewRecipe:function(e){o.$add(e)},updateInMenu:function(e,t){o[e].inMenu=!0,o[e].menuId=t;var r=n.defer();return o.$save(e).then(function(){r.resolve(!0)}),r.promise},removeMenu:function(e){o[e].inMenu=!1,o.$save(e)},removeRecipe:function(e){o.$remove(e)}}}])}(),function(){"use strict";angular.module("Recipes").factory("Menu",["$firebaseArray","$q","FIREBASE_URL",function(e,n,t){var r=new Firebase(t+"/menu"),o=e(r);return{getMenu:function(){return o},addToMenu:function(e){console.log(e),angular.forEach(e.ingredients,function(e,n){e.bought=!1});var t=n.defer();return o.$add(e).then(function(e){t.resolve(e.key())}),t.promise},removeItem:function(e){var t=o.$getRecord(e.menuId),r=n.defer();return o.$remove(t).then(function(){r.resolve(!0)}),r.promise},buyIngredient:function(e,n,t){o[n].ingredients[t]=e,o.$save(o[n])}}}])}(),function(){"use strict";angular.module("Recipes").factory("Shopping",["$firebaseArray","$q","FIREBASE_URL",function(e,n,t){var r=new Firebase(t+"/shoppingList"),o=e(r);return{getItems:function(){return o},addToList:function(e){angular.forEach(e,function(e,n){o.$add(e)})}}}])}(),function(){"use strict";angular.module("Recipes").controller("AuthCtrl",["$scope","$rootScope","$state","Auth","User",function(e,n,t,r,o){e.title="Welcome",e.login=function(e){r.signIn(e).then(function(e){n.user=e,t.go("recipes")})},e.signup=function(e){r.signUp(e).then(function(i){o.createUser(i).then(function(){r.signIn(e).then(function(e){n.user=e,t.go("recipes")})})})}}])}(),function(){"use strict";angular.module("Recipes").controller("RecipesCtrl",["$scope","Recipe","Menu","Shopping",function(e,n,t,r){e.title="Recipes",e.newForm=!1,e.recipes=n.getRecipes(),e.ingredients=[1],e.newRecipe=function(){e.newForm=!e.newForm},e.addIngredient=function(){var n=e.ingredients.length+1;e.ingredients.push(n)},e.addRecipe=function(t){n.addNewRecipe(t),e.newRec="",e.newForm=!1},e.removeRecipe=function(e){n.removeRecipe(e)},e.removeIngredient=function(n){e.ingredients.splice(n,1)},e.addToMenu=function(e,r){e.inMenu=!0,t.addToMenu(e).then(function(e){n.updateInMenu(r,e)})},e.removeMenu=function(e,r){t.removeItem(e).then(function(){n.removeMenu(r)})}}])}(),function(){"use strict";angular.module("Recipes").controller("MenuCtrl",["$scope","Menu",function(e,n){e.title="Menu",e.menu=n.getMenu()}])}(),function(){"use strict";angular.module("Recipes").controller("ShoppingCtrl",["$scope","Shopping","Menu",function(e,n,t){e.title="Shopping List",e.list=t.getMenu(),e.buyItem=function(e,n,r){e.bought=!e.bought,t.buyIngredient(e,n,r)}}])}();