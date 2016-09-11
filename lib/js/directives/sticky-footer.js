angular 
  .module('LdnBeerApp')
  .directive('stickyFooter', stickyFooter);

 function stickyFooter($window) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        scope.heights = function() {
          return {
            window: $window.innerHeight,
            body: element[0].offsetHeight
          };
        };
        
        var setFooter = function() {
          if (scope.windowHeight > scope.bodyHeight) {
            scope.footer = {
              position: 'absolute',
              bottom: 0
            };
          } else {
            scope.footer = {};
          }
        };

        scope.$watch(scope.heights, function(newValue, oldValue) {
          scope.windowHeight = newValue.window;
          scope.bodyHeight = newValue.body;
          setFooter();
        }, true);

        angular.element($window).bind('resize', function() {
          scope.$apply();
        });
      }
    };
  };