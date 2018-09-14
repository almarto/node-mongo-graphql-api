exports.plugin = {
  name: "application_routes",
  version: "1.0.0",
  register: async server => {
    server.route({
      path: "/",
      method: "GET",
      handler: (request, h) => {
        return "<h1>Welcome to the Hapi API </h1>";
      }
    });
  }
};
