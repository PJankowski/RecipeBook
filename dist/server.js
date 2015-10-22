var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    app = express();

app.use(logger('dev'));
app.set('PORT', process.env.PORT || 8000);
if(process.env.NODE_ENV == 'development'){
  app.use(express.static(path.join(__dirname, 'src')));
  app.get('/*', function(req, res){
    res.sendFile(__dirname + '/src/index.html');
  });
}else{
  app.use(express.static(path.join(__dirname, 'dist/client')));
  app.get('/*', function(req, res){
    res.sendFile(__dirname + 'dist/client/index.html');
  });
}

app.listen(app.get('PORT'), function(){
  console.log('Listening on port ' + app.get('PORT'));
});