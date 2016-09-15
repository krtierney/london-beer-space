angular
  .module("LdnBeerApp")
  .controller("CreateEventsController", CreateEventsController);

CreateEventsController.$inject = ["Event", "$state", "$rootScope"];
function CreateEventsController(Event, $state, $rootScope) {
  var self = this;
  this.new = {};

  $rootScope.$on("fileSelected", function(e, file) {

    if(self.form) {
      self.form.image.$setUntouched();
      self.form.image.$setValidity("size", true);
    }

    $rootScope.$applyAsync(function() {
      if(file.size > 250000) {
        if(self.form) {
          self.form.image.$setValidity("size", false);
          self.form.image.$setTouched(true);
        }
      }
    });
  });

  $rootScope.$on("placeChanged", function(e, place) {
    $rootScope.$applyAsync(function() {
      var location = place.geometry.location.toJSON();

      self.new.lat = location.lat;
      self.new.lng = location.lng;
      self.new.location = place.formatted_address;
    });
  });

  this.save = function() {
    Event.save(this.new, function() {
      $state.go('eventsIndex');
    });
  }
}