var User = require('../models/users'),
    jwt = require('jwt-simple'),
    _ = require('lodash'),
    config = require('../config');

exports.login = function(req, res) {
  var user = req.body;

  User.findOne({email: user.email}, function(err, loggedUser) {
    if (err) {
      res.status(500).json({msg: 'Invalid Username or Password, please try again.'});
    } else {
      var token = jwt.encode(loggedUser, config.secret);

      res.status(200).json(token);
    }
  });
};

exports.signup = function(req, res) {
  
  var user = new User(req.body);

  user.save(function(err, newUser){
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(newUser);
    }
  });

};