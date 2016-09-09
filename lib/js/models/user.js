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