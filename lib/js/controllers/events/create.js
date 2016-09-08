angular
  .module("LdnBeerApp")
  .controller("CreateEventsController", CreateEventsController);

CreateEventsController.$inject = ["Event", "$state"];
function CreateEventsController(Event, $state) {
  this.new = {};

  this.save = function() {
    Event.save(this.new, function() {
      $state.go('eventsIndex');
    });
  }
}