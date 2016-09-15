angular
  .module("LdnBeerApp")
  .controller("UpdateEventsController", UpdateEventsController);

UpdateEventsController.$inject = ["Event", "$state", "$rootScope"];
function UpdateEventsController(Event, $state, $rootScope) {
  
  var self = this;

  this.selected = Event.get($state.params);

  this.update = function updateEvent() {
    this.selected.$update(function() {
      $state.go("showEvent", $state.params);
    });
  }

  $rootScope.$on("placeChanged", function(e, place) {
    $rootScope.$applyAsync(function() {
      var location = place.geometry.location.toJSON();

      self.selected.lat = location.lat;
      self.selected.lng = location.lng;
      self.selected.location = place.formatted_address;
    });
  });
}