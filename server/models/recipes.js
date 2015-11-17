var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
  title: String,
  description: String,
  ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}]
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;