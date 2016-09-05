angular
  .module("LdnBeerApp")
  .controller("EventsController", EventsController);

EventsController.$inject = ["Event", "$state"];
function EventsController(Event, $state) {

  var self = this;

  this.all = Event.query();

  this.selected = null;

  this.new = {};

  this.select = function select(event) {
    $state.go("showEvent");
    this.selected = Event.get({ id: event._id });
    // console.log(this.selected);
  }

  this.deselect = function deselect() {
    this.selected = null;
  }

  this.save = function newEvent() {
    Event.save(self.new, function(event) {
      self.all.push(event);
      console.log(event);
      self.new = {};
      $state.go("eventsIndex");
    });
  }

  this.update = function updateEvent() {
    console.log(self.selected);
    self.selected.$update(function(updatedEvent) {
      var index = self.all.findIndex(function(event) {
        return event._id === updatedEvent._id;
      });

      self.all.splice(index, 1, updatedEvent);
      self.selected = null;
    }, function(err) {
      console.log(err);
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