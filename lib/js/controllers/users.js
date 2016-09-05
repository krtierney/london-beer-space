angular
  .module("LdnBeerApp")
  .controller("CurrentUserController", CurrentUserController);

CurrentUserController.$inject = ["TokenService", "$state", "$rootScope"];
function CurrentUserController(TokenService, $state, $rootScope) {
  var self = this;

  this.currentUser = TokenService.decodeToken();

  this.logout = function logout() {
    TokenService.clearToken();
    this.currentUser = null;
    $state.go("home");
  }

  $rootScope.$on("loggedIn", function() {
    self.currentUser = TokenService.decodeToken();
  });

  $rootScope.$on("unauthorized", function() {
    $state.go("login");
    self.errorMessage = "Please log in.";
  });
}