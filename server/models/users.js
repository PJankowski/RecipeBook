var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: {
    first: String,
    last: String
  },
  username: String,
  email: {type: String, unique: true},
  password: String,
  recipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}]
});

var User = mongoose.model('User', userSchema);

module.exports = User;