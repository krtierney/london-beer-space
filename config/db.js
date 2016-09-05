dbURIs = {
  test: "mongodb://localhost/ldn-beer-api-test",
  development: "mongodb://localhost/ldn-beer-api",
  production: process.env.MONGOLAB_URI || "mongodb://localhost/ldn-beer-api-test"
}

module.exports = function(env) {
  return dbURIs[env];
}