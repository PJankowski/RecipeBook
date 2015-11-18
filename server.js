var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express();

mongoose.connect('mongodb://localhost/recipeBook', function(err){
  if(err){
    console.log(err);
  }
  else {
    console.log('Connected!');
  }
});

app.use(logger('dev'));
app.set('PORT', process.env.PORT || 8000);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if(process.env.NODE_ENV == 'development'){
  app.use(express.static(path.join(__dirname, 'src')));
}else{
  app.use(express.static(path.join(__dirname, 'client')));
}

var config = require('./server/config');
var recipes = require('./server/controllers/recipes');
require('./server/routes')(app);

app.listen(app.get('PORT'), function(){
  console.log('Listening on port ' + app.get('PORT'));
});

exports = module.exports = app;