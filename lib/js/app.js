angular
  .module('LdnBeerApp', ['ui.router', 'ui.bootstrap', 'ngResource', 'ngTouch', 'ngAnimate', 'angular-jwt', 'ngMessages', 'satellizer', 'ui.bootstrap.datetimepicker', 'ui.bootstrap.showErrors', 'ngCalendar'])
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
      })
      .state("about", {
        url: "/about",
        templateUrl: "templates/about.html",
      })
      .state("contact", {
        url: "/contact",
        templateUrl: "templates/contact.html",
      })
      .state("publicAPI", {
        url: "/api-docs",
        templateUrl: "templates/apiDocs.html",
      });

      $urlRouterProvider.otherwise("/");
  }
