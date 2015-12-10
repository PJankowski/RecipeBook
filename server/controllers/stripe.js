var config = require('../config'),
    stripe = require('stripe')(config.stripeAPIKey);

exports.getPlans = function(req, res) {
  stripe.plans.list()
    .then(function(plans){
      res.status(200).json(plans.data);
    })
    .catch(function(err){
      res.status(500).json(err);
    });
};