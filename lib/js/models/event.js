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