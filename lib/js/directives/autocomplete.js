angular.module('LdnBeerApp')
  .directive('autocomplete', autocomplete)

autocomplete.$inject = ["$rootScope"];
function autocomplete($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element) {
        var autocomplete = new google.maps.places.Autocomplete(element[0]);

        autocomplete.addListener('place_changed', function(place) {
          $rootScope.$broadcast("placeChanged", autocomplete.getPlace());
        });
    }
  }
}
