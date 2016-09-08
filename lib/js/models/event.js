angular
  .module("LdnBeerApp")
  .factory("Event", Event);

Event.$inject = ["$resource", "API_URL", "formData"];
function Event($resource, API_URL, formData) {
  return $resource(API_URL + "/events/:id", { id: '@_id' }, {
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
    },
    delete: { method: "DELETE" }
  });
}