angular
  .module("LdnBeerApp")
  .controller("LoginController", LoginController);

LoginController.$inject = ["User", "$state", "$rootScope", "$auth"];
function LoginController(User, $state, $rootScope, $auth) {

  var self = this;

  this.credentials = {};

  this.submit = function submit() {
    if(this.form.$valid) {
      User.login(this.credentials, function(res) {
        $rootScope.$broadcast("loggedIn");
        $state.go("home");

        self.form.$setUntouched();
      });
    }
  }

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        self.currentUser = $auth.getPayload();
      });
  }

  this.currentUser = $auth.getPayload();

}