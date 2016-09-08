angular
  .module("LdnBeerApp")
  .controller("RegisterController", RegisterController);

RegisterController.$inject = ["$state", "$rootScope"];
function RegisterController($state, $rootScope) {

  this.user = {};


  this.submit = function submit() {
    $auth.signup(this.user, {
      url: "/api/register"
    })
    .then(function() {
      $state.go("eventsIndex");
      $rootScope.$broadcast("loggedIn");
    });
  }
}