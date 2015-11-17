var config = require('./config.js'),
    recipes = require('./controllers/recipes'),
    path = require('path');

module.exports = function(app) {

  /**
   * Recipes
   */
  app.get('/api/recipes', recipes.index);
  app.post('/api/recipes', recipes.create);
  app.delete('/api/recipe/:id', recipes.destroy);

  if(config.env == 'development') {
    app.get('/*', function(req, res){
      res.sendFile(path.normalize(__dirname + '/../src/index.html'));
    });
  } else {
    app.get('/*', function(req, res){
      res.sendFile(path.normalize(__dirname + '/../dist/index.html'));
    });
  }

};