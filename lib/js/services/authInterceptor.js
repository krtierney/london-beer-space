angular
  .module("LdnBeerApp")
  .factory("AuthInterceptor", AuthInterceptor);

AuthInterceptor.$injec = ["TokenService", "API_URL", "$rootScope"];
function AuthInterceptor(TokenService, API_URL, $rootScope) {
  return {
    request: function(req) {
      var token = TokenService.getToken();

      if(!!req.url.match(API_URL) && token) {
        req.headers.Authorization = "Bearer " + token;
      }
      return req
    },

    response: function(res) {
      if(res.config.url.match(API_URL) && res.data.token) {
        TokenService.setToken(res.data.token);
      }

      return res;
    },

    responseError: function(res) {
      if(res.status === 401) {
        $rootScope.$broadcast("unauthorized")
      }

      return res.data;
    }
  }
}