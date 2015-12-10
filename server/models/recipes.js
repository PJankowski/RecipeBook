var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
  title: String,
  description: String,
  inMenu: {type: Boolean, default: false},
  ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}],
  user: {type: String, ref: 'User'}
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;