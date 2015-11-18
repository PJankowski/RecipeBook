var Recipe = require('../models/recipes'),
    _ = require('lodash');

exports.index = function(req, res) {
    Recipe.find({
        inMenu: true
    })
        .populate('ingredients')
        .exec(function(err, recipes) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(recipes);
            }
        });
};

exports.addToMenu = function(req, res) {
    var recipe = req.body;

    Recipe.findByIdAndUpdate(recipe._id, {
        inMenu: true
    }, function(err, doc) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(doc);
        }
    });
};

exports.removeFromMenu = function(req, res) {
    var recipe = req.body;

    Recipe.findByIdAndUpdate(recipe._id, {
        inMenu: false
    }, function(err, doc) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(doc);
        }
    });
};