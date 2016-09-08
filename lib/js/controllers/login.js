angular
  .module("LdnBeerApp")
  .controller("LoginController", LoginController);

LoginController.$inject = ["User", "$state", "$rootScope", "$auth"];
function LoginController(User, $state, $rootScope, $auth) {

  var self = this;

  this.credentials = {};

  this.submit = function submit() {
    $auth.login(this.credentials, {
      url: "/api/login"
    }).then(function() {
      $state.go("eventsIndex");
      $rootScope.$broadcast("loggedIn");
    });
  }


  this.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        self.currentUser = $auth.getPayload();
      });
  }

  this.currentUser = $auth.getPayload();

}