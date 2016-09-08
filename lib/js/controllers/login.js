angular
  .module("LdnBeerApp")
  .controller("LoginController", LoginController);

LoginController.$inject = ["$state", "$rootScope", "$auth"];
function LoginController($state, $rootScope, $auth) {
  
  this.credentials = {};

  this.submit = function() {
    $auth.login(this.credentials, {
      url: "/api/login"
    }).then(function() {
      $rootScope.$broadcast("loggedIn");
      $state.go("eventsIndex");
    });
  }


  this.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        $rootScope.$broadcast("loggedIn");
        $state.go("eventsIndex");
      });
  }
}