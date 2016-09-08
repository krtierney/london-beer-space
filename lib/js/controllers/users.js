angular
  .module("LdnBeerApp")
  .controller("CurrentUserController", CurrentUserController);

CurrentUserController.$inject = ["$state", "$rootScope", "$auth", "$window"];
function CurrentUserController($state, $rootScope, $auth, $window) {

  var self = this;
  this.currentUser = $auth.getPayload();

  $rootScope.$on("loggedIn", function() {
    self.currentUser = $auth.getPayload();
  });

  $rootScope.$on("unauthorized", function() {
    $state.go("login");
    self.errorMessage = "Please log in.";
  });

  this.logout = function logout() {
    $auth.logout();
    this.currentUser = null;
    $state.go("home");
  }
}