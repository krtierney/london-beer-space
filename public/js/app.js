angular
  .module('LdnBeerApp', ['ui.router', 'ui.bootstrap', 'ngResource', 'ngTouch', 'ngAnimate', 'angular-jwt', 'ngMessages', 'satellizer', 'ui.bootstrap.datetimepicker'])
  .config(oAuthConfig)
  .config(Router);

  oAuthConfig.$inject = ["$authProvider"];
  function oAuthConfig($authProvider) {
    $authProvider.facebook({
      url: '/api/oauth/facebook',
      clientId: "349428735446661"
    });

    $authProvider.twitter({
      url: '/api/oauth/twitter',
      clientId: "YjSOxNEdFNfHixvgyqpCcIzle"
    })
  }

  Router.$inject = ["$stateProvider", "$urlRouterProvider"];
  function Router($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "templates/home.html",
        controller: "EventsController as events"
      })
      .state("login", {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: "LoginController as login"
      })
      .state("register", {
        url: "/register",
        templateUrl: "templates/register.html",
        controller: "RegisterController as register"
      })
      .state("eventsIndex", {
        url: "/events",
        templateUrl: "templates/events/index.html", 
        controller: "EventsController as events"
      })
      .state("createEvent", {
        url: "/events/new",
        templateUrl: "templates/events/create.html",
        controller: "CreateEventsController as createEvent"
      })
      .state("showEvent", {
        url: "/events/:id",
        templateUrl: "templates/events/show.html",
        controller: "ShowEventsController as showEvent"
      })
      .state("updateEvent", {
        url: "/events/:id/update",
        templateUrl: "templates/events/update.html",
        controller: "UpdateEventsController as updateEvent"
      });

      $urlRouterProvider.otherwise("/");
  }

angular
  .module("LdnBeerApp")
  .controller("EventsController", EventsController);

EventsController.$inject = ["Event", "$state"];
function EventsController(Event, $state) {

  var self = this;

  this.all = Event.query();

  this.new = {};

  this.select = function select(event) {
    console.log($state.params);
    $state.go("showEvent");
    console.log($state.params);
    this.selected = Event.get($state.params);
  }

  this.deselect = function deselect() {
    this.selected = null;
  }

  this.save = function newEvent() {
    Event.save(self.new, function() {
      $state.go("eventsIndex");
    });
  }

  this.update = function updateEvent() {
    self.selected.$update(function() {
      $state.go("showEvent", $state.params);
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
angular
  .module("LdnBeerApp")
  .controller("LoginController", LoginController);

LoginController.$inject = ["$state", "$rootScope", "$auth"];
function LoginController($state, $rootScope, $auth) {
  
  this.credentials = {};

  this.submit = function() {
    $auth.login(this.credentials, {
      url: "/api/login"
    }).then(function() {
      $rootScope.$broadcast("loggedIn");
      $state.go("eventsIndex");
    });
  }


  this.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        $rootScope.$broadcast("loggedIn");
        $state.go("eventsIndex");
      });
  }
}
angular
  .module("LdnBeerApp")
  .controller("RegisterController", RegisterController);

RegisterController.$inject = ["$state", "$rootScope"];
function RegisterController($state, $rootScope) {

  this.user = {};


  this.submit = function submit() {
    $auth.signup(this.user, {
      url: "/api/register"
    })
    .then(function() {
      $state.go("eventsIndex");
      $rootScope.$broadcast("loggedIn");
    });
  }
}
angular
  .module("LdnBeerApp")
  .controller("CurrentUserController", CurrentUserController);

CurrentUserController.$inject = ["$state", "$rootScope", "$auth", "$window"];
function CurrentUserController($state, $rootScope, $auth, $window) {

  var self = this;
  this.currentUser = $auth.getPayload();

  $rootScope.$on("loggedIn", function() {
    self.currentUser = $auth.getPayload();
  });

  $rootScope.$on("unauthorized", function() {
    $state.go("login");
    self.errorMessage = "Please log in.";
  });

  this.logout = function() {
    $auth.logout();
    this.currentUser = null;
    $state.go("home");
  }
}
angular 
  .module('LdnBeerApp')
  .directive('date', date);

function date() {
  return {
    restrict: 'A',
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {
      ngModel.$formatters.push(function(value) {
        return new Date(value);
      });
    }
  }
}

// Probably can remove this since I'm using the date picker, 
//but need more testing to confirm
angular 
  .module('LdnBeerApp')
  .directive('file', file);

function file() {
  return {
    restrict: 'A',
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {
      element.on('change', function(e) {
        ngModel.$setViewValue(e.target.files[0]);
      });
    }
  }
}
angular
  .module("LdnBeerApp")
  .factory("Event", Event);

Event.$inject = ["$resource", "formData"];
function Event($resource, formData) {
  return $resource("/api/events/:id", { id: '@_id' }, {
    save: { 
      method: "POST",
      headers: { 'Content-Type': undefined },
      transformRequest: formData.transform
    },
    update: { 
      method: "PUT",
      headers: { 'Content-Type': undefined },
      transformRequest: formData.transform
    },
    update: { 
      method: "PATCH",
      headers: { 'Content-Type': undefined },
      transformRequest: formData.transform
    }
  });
}
angular
  .module("LdnBeerApp")
  .factory("User", User);

User.$inject = ["$resource"];
function User($resource) {
  return $resource("/api/users", { id: '@_id' }, {
    update: { method: "PUT" },
    login: { method: "POST", url: "/api/login" },
    register: { method: "POST", url: "/api/register" }
  });
}
angular
  .module('LdnBeerApp')
  .factory('formData', formData);

function formData() {
  return {
    transform: function(data) {
      var formData = new FormData();
      angular.forEach(data, function(value, key) {
        if(value._id) value = value._id;
        if(!key.match(/^\$/)) formData.append(key, value);
      });

      return formData;
    }
  }
}


angular
  .module("LdnBeerApp")
  .controller("CreateEventsController", CreateEventsController);

CreateEventsController.$inject = ["Event", "$state"];
function CreateEventsController(Event, $state) {
  this.new = {};

  this.save = function() {
    Event.save(this.new, function() {
      $state.go('eventsIndex');
    });
  }
}
angular
  .module('LdnBeerApp')
  .controller('DateTimeController',
  function ($scope, $timeout) {
    $scope.dateTimeNow = function() {
      $scope.date = new Date();
    };
    $scope.dateTimeNow();
    
    $scope.toggleMinDate = function() {
      var minDate = new Date();
      // set to yesterday
      minDate.setDate(minDate.getDate() - 1);
      $scope.dateOptions.minDate = $scope.dateOptions.minDate ? null : minDate;
    };
     
    $scope.dateOptions = {
      showWeeks: false,
      startingDay: 0
    };
    
    $scope.toggleMinDate();
    
    // Disable weekend selection
    $scope.disabled = function(calendarDate, mode) {
      return mode === 'day' && ( calendarDate.getDay() === 0 || calendarDate.getDay() === 6 );
    };
    
    $scope.open = function($event,opened) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.dateOpened = true;
    };
    
    $scope.dateOpened = false;
    $scope.hourStep = 1;
    $scope.format = "dd MMM yyyy";
    $scope.minuteStep = 15;

    $scope.timeOptions = {
      hourStep: [1, 2, 3],
      minuteStep: [1, 5, 10, 15, 25, 30]
    };

    $scope.showMeridian = true;
    $scope.timeToggleMode = function() {
      $scope.showMeridian = !$scope.showMeridian;
    };
    
    $scope.$watch("date", function(date) {
      // read date value
    }, true);
    
    $scope.resetHours = function() {
      $scope.date.setHours(1);
    };
  });
angular
  .module("LdnBeerApp")
  .controller("ShowEventsController", ShowEventsController);

ShowEventsController.$inject = ["Event", "$state"];
function ShowEventsController(Event, $state) {
  this.selected = Event.get($state.params);

  this.delete = function deleteEvent() {
    this.selected.$delete(function() {
      $state.go("eventsIndex");
    });
  }
}
angular
  .module("LdnBeerApp")
  .controller("UpdateEventsController", UpdateEventsController);

UpdateEventsController.$inject = ["Event", "$state"];
function UpdateEventsController(Event, $state) {
  this.selected = Event.get($state.params);

  this.update = function updateEvent() {
    this.selected.$update(function() {
      $state.go("showEvent", $state.params);
    });
  }
}