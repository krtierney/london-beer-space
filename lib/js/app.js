angular
  .module('LdnBeerApp', ['ui.router', 'ui.bootstrap', 'ngResource', 'ngTouch', 'ngAnimate', 'angular-jwt', 'ngMessages'])
  .constant("API_URL", "http://localhost:3000/api")
  .config(setupInterceptors)
  .config(Router);

  setupInterceptors.$inject = ["$httpProvider"];
  function setupInterceptors($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
    $httpProvider.interceptors.push("DateInterceptor");
  }

  Router.$inject = ["$stateProvider", "$urlRouterProvider"];
  function Router($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "templates/home.html"
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
        templateUrl: "templates/events/index.html"
      })
      .state("createEvent", {
        url: "/events/new",
        templateUrl: "templates/events/create.html"
      })
      .state("updateEvent", {
        url: "/events/:id/update",
        templateUrl: "templates/events/update.html"
      })
      .state("showEvent", {
        url: "/events/:id",
        templateUrl: "templates/events/show.html"
      });

      $urlRouterProvider.otherwise("/");
  }
