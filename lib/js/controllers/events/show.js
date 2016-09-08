angular
  .module("LdnBeerApp")
  .controller("ShowEventsController", ShowEventsController);

ShowEventsController.$inject = ["Event", "$state"];
function ShowEventsController(Event, $state) {
  this.selected = Event.get($state.params);

  this.delete = function deleteEvent() {
    this.selected.$delete(function() {
      $state.go("eventsIndex");
    });
  }
}