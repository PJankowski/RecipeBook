var config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  // mongoUri: if (process.env.NODE_ENV == 'development') { 'mongodb://localhost/recipeBook' } else { process.env.ENV['mongolab'] }
  mongoUri: process.env.mongolab || 'mongodb://localhost/recipeBook'
};

module.exports = config;