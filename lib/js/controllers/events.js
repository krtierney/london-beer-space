angular
  .module("LdnBeerApp")
  .controller("EventsController", EventsController);

EventsController.$inject = ["Event", "$state"];
function EventsController(Event, $state) {

  var self = this;

  this.all = Event.query();

  this.new = {};

  this.select = function select(event) {
    console.log($state.params);
    $state.go("showEvent");
    this.selected = Event.get($state.params);
  }

  this.deselect = function deselect() {
    this.selected = null;
  }

  this.save = function newEvent() {
    Event.save(self.new, function() {
      $state.go("eventsIndex");
    });
  }

  this.update = function updateEvent() {
    self.selected.$update(function() {
      $state.go("showEvent", $state.params);
    });
  }

  this.delete = function deleteEvent(event) {
    event.$delete(function() {
      var index = self.all.indexOf(event);
      self.all.splice(index, 1);
      self.selected = null;
      $state.go("eventsIndex");
    });
  }

}