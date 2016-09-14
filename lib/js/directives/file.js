angular 
  .module('LdnBeerApp')
  .directive('file', file);

file.$inject = ["$rootScope"];
function file($rootScope) {
  return {
    restrict: 'A',
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {
      element.on('change', function(e) {
        ngModel.$setViewValue(e.target.files[0]);
        $rootScope.$broadcast("fileSelected", e.target.files[0]);
      });
    }
  }
}