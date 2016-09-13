angular
  .module("LdnBeerApp")
  .controller("MapsController", MapsController);

MapsController.$inject = ["$interval"];
function MapsController($interval) {

  var self = this;

  this.all = [
    { center: { lat: 51.5, lng: -0.1 } },
  ];
}