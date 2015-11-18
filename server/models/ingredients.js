var mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
  _recipe: {type: String, ref: 'Recipe'},
  name: String,
  amount: String,
  bought: {type: Boolean, default: false}
});

var Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;