var config = require('./config.js'),
    stripe = require('./controllers/stripe'),
    auth = require('./controllers/auth'),
    recipes = require('./controllers/recipes'),
    menu = require('./controllers/menu'),
    shopping = require('./controllers/shopping-list'),
    path = require('path');

module.exports = function(app) {

  /**
   * Stripe
   */
   app.get('/api/stripe/plans', stripe.getPlans);

  /**
   * Auth
   */
  app.post('/api/login', auth.login);
  app.post('/api/signup', auth.signup);
  app.post('/api/logout', auth.logout);

  /**
   * Recipes
   */
  app.get('/api/recipes', recipes.index);
  app.post('/api/recipes', recipes.create);
  app.delete('/api/recipes/:id', recipes.destroy);

  /**
   * Menu
   */
  app.get('/api/recipes/menu', menu.index);
  app.put('/api/recipes/menu', menu.addToMenu);
  app.put('/api/recipes/menu/remove', menu.removeFromMenu);

  /**
   * Shopping
   */
  app.get('/api/recipes/shopping', shopping.index);
  app.put('/api/recipes/item', shopping.buyItem);

  if(config.env == 'development') {
    app.get('/*', function(req, res){
      res.sendFile(path.normalize(__dirname + '/../src/index.html'));
    });
  } else {
    app.get('/*', function(req, res){
      res.sendFile(path.normalize(__dirname + '/../../dist/client/index.html'));
    });
  }

};