angular
  .module("LdnBeerApp")
  .controller("ShowEventsController", ShowEventsController);

ShowEventsController.$inject = ["Event", "$state"];
function ShowEventsController(Event, $state) {
  
  var self = this;

  this.selected = Event.get($state.params);

  //returns selected event object
  console.log(this.selected);

  //returns undefined
  console.log(this.selected.date);

  this.delete = function deleteEvent() {
    this.selected.$delete(function() {
      $state.go("eventsIndex");
    });
  }

  this.calEvent = {};

  this.generateCal = function() {
    self.calEvent = {
      start: self.selected.date,
      title: self.selected.title,
    };
    return self.calEvent;
  }

}