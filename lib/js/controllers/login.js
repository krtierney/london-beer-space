angular
  .module("LdnBeerApp")
  .controller("LoginController", LoginController);

LoginController.$inject = ["User", "$state", "$rootScope"];
function LoginController(User, $state, $rootScope) {

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
}