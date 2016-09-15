angular
  .module("LdnBeerApp")
  .controller("Calendar", Calendar);

Calendar.$inject = ["Event", "$state", "Calendar", "$auth"];
function Calendar(Event, $state, Calendar, $auth) {
  
  var self = this;

  Event.get($state.params).$promise.then(function(event) {

    self.selected = event;

    var calEvent = {
      start: new Date(self.selected.date),
      title: self.selected.title,
      description: self.selected.description,
      address: self.selected.location
    }
    self.ical = Calendar.ical([calEvent]);
    self.gcal = Calendar.google(calEvent);
    self.outlook = Calendar.outlook(calEvent);
    self.yahoo = Calendar.yahoo(calEvent);

    self.canEdit = self.selected.createdBy == $auth.getPayload()._id || $auth.getPayload().isAdmin;

    self.hasImage = self.selected.image !== "https://s3-us-west-1.amazonaws.com/london-beer-space/undefined"
  });

  this.delete = function deleteEvent() {
    this.selected.$delete(function() {
      $state.go("eventsIndex");
    });
  }
}