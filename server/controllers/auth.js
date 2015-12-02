var User = require('../models/users'),
    jwt = require('jwt-simple'),
    _ = require('lodash'),
    config = require('../config');

var today = new Date(),
    exp = new Date(today);

exp.setDate(today.getDate() + 60);

exports.login = function(req, res) {
  var user = req.body;

  User.findOne({email: user.email}, function(err, loggedUser) {
    if (err) {
      res.status(500).json(err);
    } else {

      if(!loggedUser) {
        res.status(500).json({msg: 'Incorrect username.'});
      }

      if(user.password === loggedUser.password) {

        var token = jwt.encode({
          email: loggedUser.email,
          uuid: loggedUser._id,
          exp: parseInt(exp.getTime() / 1000)
        }, config.secret);

        req.session.user = loggedUser._id;

        res.status(200).json(token);

      } else {
        res.status(500).json({msg: 'Incorrect password.'});
      }
    }
  });
};

exports.signup = function(req, res) {
  
  var user = new User(req.body);

  user.save(function(err, newUser){
    if (err) {
      res.status(500).json(err);
    } else {
      var token = jwt.encode({
        email: newUser.email,
        uuid: newUser._id,
        exp: parseInt(exp.getTime() / 1000)
      }, config.secret);

      req.session.user = newUser._id;

      res.status(200).json(token);
    }
  });

};

exports.logout = function(req, res) {
  req.session.user = null;
  res.status(200).json({response: true});
};