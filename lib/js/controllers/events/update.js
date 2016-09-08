angular
  .module("LdnBeerApp")
  .controller("UpdateEventsController", UpdateEventsController);

UpdateEventsController.$inject = ["Event", "$state"];
function UpdateEventsController(Event, $state) {
  this.selected = Event.get($state.params);

  this.update = function updateEvent() {
    this.selected.$update(function() {
      $state.go("showEvent", $state.params);
    });
  }
}