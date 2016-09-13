angular
  .module("LdnBeerApp")
  .directive("gMap", gMap);

function gMap() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="g-map"></div>',
    scope: {
      center: '='
    },
    link: function(scope, element) {

      if(!scope.center) {
        throw new Error("You must include a `center` attribute in your g-map directive");
      }

      var map = new google.maps.Map(element[0], {
        center: scope.center,
        zoom: 10
      });

      scope.$watch('center.lat', updateMap);
      scope.$watch('center.lng', updateMap);

      function updateMap() {
        map.panTo(scope.center);
      }
    }
  }
}
