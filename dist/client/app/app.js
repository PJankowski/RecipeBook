!function(){"use strict";angular.module("Recipes",["ui.router","firebase"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,n,t){n.otherwise("/"),t.html5Mode(!0),e.state("recipes",{url:"/",templateUrl:"/app/partials/recipes.html",controller:"RecipesCtrl"}).state("menu",{url:"/menu",templateUrl:"/app/partials/menu.html",controller:"MenuCtrl"}).state("shopping",{url:"/shopping",templateUrl:"/app/partials/shopping.html",controller:"ShoppingCtrl"})}]).run(["$rootScope",function(e){e.$on("$stateChangeSuccess",function(n,t,r,i,o){e.state=t.name})}])}(),function(){"use strict";angular.module("Recipes").factory("Recipe",["$firebaseArray","$q",function(e,n){var t=new Firebase("https://bookofrecipes.firebaseio.com/recipes"),r=e(t);return{getRecipes:function(){return r},addNewRecipe:function(e){r.$add(e)},updateInMenu:function(e,t){r[e].inMenu=!0,r[e].menuId=t;var i=n.defer();return r.$save(e).then(function(){i.resolve(!0)}),i.promise},removeMenu:function(e){r[e].inMenu=!1,r.$save(e)},removeRecipe:function(e){r.$remove(e)}}}])}(),function(){"use strict";angular.module("Recipes").factory("Menu",["$firebaseArray","$q",function(e,n){var t=new Firebase("https://bookofrecipes.firebaseio.com/menu"),r=e(t);return{getMenu:function(){return r},addToMenu:function(e){console.log(e),angular.forEach(e.ingredients,function(e,n){e.bought=!1});var t=n.defer();return r.$add(e).then(function(e){t.resolve(e.key())}),t.promise},removeItem:function(e){var t=r.$getRecord(e.menuId),i=n.defer();return r.$remove(t).then(function(){i.resolve(!0)}),i.promise},buyIngredient:function(e,n,t){r[n].ingredients[t]=e,r.$save(r[n])}}}])}(),function(){"use strict";angular.module("Recipes").factory("Shopping",["$firebaseArray","$q",function(e,n){var t=new Firebase("https://bookofrecipes.firebaseio.com/shoppingList"),r=e(t);return{getItems:function(){return r},addToList:function(e){angular.forEach(e,function(e,n){r.$add(e)})}}}])}(),function(){"use strict";angular.module("Recipes").controller("RecipesCtrl",["$scope","Recipe","Menu","Shopping",function(e,n,t,r){e.title="Recipes",e.newForm=!1,e.recipes=n.getRecipes(),e.ingredients=[1],e.newRecipe=function(){e.newForm=!e.newForm},e.addIngredient=function(){var n=e.ingredients.length+1;e.ingredients.push(n)},e.addRecipe=function(t){n.addNewRecipe(t),e.newRec="",e.newForm=!1},e.removeRecipe=function(e){n.removeRecipe(e)},e.removeIngredient=function(n){e.ingredients.splice(n,1)},e.addToMenu=function(e,r){e.inMenu=!0,t.addToMenu(e).then(function(e){n.updateInMenu(r,e)})},e.removeMenu=function(e,r){t.removeItem(e).then(function(){n.removeMenu(r)})}}])}(),function(){"use strict";angular.module("Recipes").controller("MenuCtrl",["$scope","Menu",function(e,n){e.title="Menu",e.menu=n.getMenu()}])}(),function(){"use strict";angular.module("Recipes").controller("ShoppingCtrl",["$scope","Shopping","Menu",function(e,n,t){e.title="Shopping List",e.list=t.getMenu(),e.buyItem=function(e,n,r){e.bought=!e.bought,t.buyIngredient(e,n,r)}}])}();