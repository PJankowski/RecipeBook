var config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  mongoUri: process.env.mongolab,
  secret: process.env.jSecret
};

module.exports = config;