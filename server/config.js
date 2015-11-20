var config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  mongoUri: process.env.NODE_ENV == 'development' ? 'mongodb://localhost/recipeBook' : process.env.ENV['mongolab'] 
};

module.exports = config;