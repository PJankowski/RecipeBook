var Recipe = require('../models/recipes'),
    Ingredient = require('../models/ingredients'),
    jwt = require('jwt-simple'),
    config = require('../config'),
    _ = require('lodash');

exports.index = function(req, res) {
    var user = req.session.user;

    Recipe.find({user: user})
        .populate('ingredients')
        .exec(function(err, recipes) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(201).json(recipes);
            }
        });
};

exports.create = function(req, res) {
    var rec = req.body.recipe,
        ing = req.body.ingredients;

    rec.user = req.session.user;

    var recipe = new Recipe(rec);
    var ingredient;

    _.forEach(ing, function(n, key) {

        n._recipe = recipe._id;
        ingredient = new Ingredient(n);

        recipe.ingredients.push(ingredient._id);

        ingredient.save(function(err) {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });

    });

    recipe.save(function(err, doc) {
        if (err) {
            res.status(500).json(err);
        } else {
            rec.ingredients = ing;
            rec._id = doc._id;

            res.status(201).json(rec);
        }
    });

};

exports.destroy = function(req, res) {
    var id = req.params.id;

    Recipe.findOneAndRemove({
        _id: id
    }, function(err, doc) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(doc);
        }
    });
};