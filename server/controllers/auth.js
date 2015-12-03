var User = require('../models/users'),
    jwt = require('jwt-simple'),
    _ = require('lodash'),
    config = require('../config');

var today = new Date(),
    exp = new Date(today),
    stripe = require('stripe')(config.stripeAPIKey);

exp.setDate(today.getDate() + 60);

exports.login = function(req, res) {
    var user = req.body;

    User.findOne({
        email: user.email
    }, function(err, loggedUser) {
        if (err) {
            res.status(500).json(err);
        } else {

            if (!loggedUser) {
                res.status(500).json({
                    msg: 'Incorrect username.'
                });
            }

            if (user.password === loggedUser.password) {

                stripe.customers.retrieve(
                    loggedUser.stripe
                    )
                    .then(function(customer){
                        var delinquent = customer.delinquent;

                        var token = jwt.encode({
                            email: loggedUser.email,
                            uuid: loggedUser._id,
                            delinquent: delinquent,
                            exp: parseInt(exp.getTime() / 1000)
                        }, config.secret);

                        req.session.user = loggedUser._id;

                        res.status(200).json(token);
                    })
                    .catch(function(err){
                        res.status(500).json(err);
                    });

            } else {
                res.status(500).json({
                    msg: 'Incorrect password.'
                });
            }
        }
    });
};

exports.signup = function(req, res) {

    var user = new User(req.body);

    stripe.customers.create({
        email: user.email
    })
        .then(function(customer) {
            user.stripe = customer.id;
            user.save(function(err, newUser) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    var token = jwt.encode({
                        email: newUser.email,
                        uuid: newUser._id,
                        delinquent: customer.delinquent,
                        exp: parseInt(exp.getTime() / 1000)
                    }, config.secret);

                    req.session.user = newUser._id;

                    res.status(200).json(token);
                }
            });
        })
        .catch(function(err) {
            res.status(500).json(err);
        });

};

exports.logout = function(req, res) {
    req.session.user = null;
    res.status(200).json({
        response: true
    });
};