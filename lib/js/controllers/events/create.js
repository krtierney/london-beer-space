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

  this.save = function() {
    Event.save(this.new, function() {
      $state.go('eventsIndex');
    });
  }
}