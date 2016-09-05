angular
  .module("LdnBeerApp")
  .factory("DateInterceptor", DateInterceptor);

DateInterceptor.$inject = ["TokenService", "API_URL", "$rootScope"];
function DateInterceptor(TokenService, API_URL, $rootScope) {
  return {
    response: function(res) {
      if(res.config.url.match(API_URL) && res.data) {
        if(res.data instanceof Array) {
          res.data = res.data.map(function(record) {
            if(record.hasOwnProperty('date')) {
              record.date = new Date(record.date);
            }
            return record;
          });
        }
        else if(res.data.hasOwnProperty('date')) {
          res.data.date = new Date(res.data.date);
        }
      }
      return res;
    }
  }
}