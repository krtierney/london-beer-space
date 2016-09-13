angular
  .module("LdnBeerApp")
  .controller("Calendar", Calendar);

Calendar.$inject = ["Event", "$state", "Calendar"];
function Calendar(Event, $state, Calendar) {
  
  var self = this;

  Event.get($state.params).$promise.then(function(event) {

    self.selected = event;

    var calEvent = {
      start: new Date(self.selected.date),
      title: self.selected.title,
      description: self.selected.description
      }
    
    console.log('ical', Calendar.ical([calEvent]));
    console.log('outlook', Calendar.outlook(calEvent));
    console.log('google', Calendar.google(calEvent));
    console.log('yahoo', Calendar.yahoo(calEvent));
  });



  this.delete = function deleteEvent() {
    this.selected.$delete(function() {
      $state.go("eventsIndex");
    });
  }
}