var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    config = require('./server/config'),
    app = express();

app.use(logger('dev'));
app.set('port', config.port);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if(config.env == 'development'){
  app.use(express.static(path.join(__dirname, 'src')));
}else{
  app.use(express.static(path.join(__dirname, 'client')));
}

mongoose.connect(config.mongoUri, function(err){
  if(err){
    console.log(err);
  }
});

// var recipes = require('./server/controllers/recipes');
require('./server/routes')(app);

app.listen(config.port, function(){
  console.log('Listening on port ' + config.port);
});

exports = module.exports = app;