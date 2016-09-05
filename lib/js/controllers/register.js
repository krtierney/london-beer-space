angular
  .module("LdnBeerApp")
  .controller("RegisterController", RegisterController);

RegisterController.$inject = ["User", "$state", "$rootScope"];
function RegisterController(User, $state, $rootScope) {

  var self = this;

  this.user = {};

  this.submit = function() {
    if (this.form.$valid) {
      User.register(this.user, function(res) {
        $rootScope.$broadcast("loggedIn");
        $state.go("home");

      self.form.$setUntouched();
      });
    }
  }
}