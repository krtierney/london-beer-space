dbURIs = {
  test: "mongodb://localhost/ldn-beer-api-test",
  development: "mongodb://localhost/ldn-beer-api",
  production: process.env.MONGODB_URI || "mongodb://localhost/ldn-beer-api-test"
}

module.exports = function(env) {
  return dbURIs[env];
}