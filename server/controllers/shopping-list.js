var Recipe = require('../models/recipes'),
    Ingredient = require('../models/ingredients'),
    _ = require('lodash');

exports.index = function(req, res) {
  Recipe.find({inMenu: true})
  .populate('ingredients')
  .exec(function(err, recipes){
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(recipes);
    }
  });
};

exports.buyItem = function(req, res) {
  var ingredient = req.body;

  Ingredient.findByIdAndUpdate(ingredient._id, {bought: !ingredient.bought}, function(err, doc){
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(doc);
    }
  });
};