import * as Hapi from "hapi";

import { IRoute } from "../interfaces/IRoute";

const ApplicationRoutes: IRoute = {
  name: "app_api",
  version: "1.0.0",
  register: async (server: Hapi.Server) =>
    server.route([
      {
        path: "/",
        method: "GET",
        handler: (request, h) => {
          return "<h1>Welcome to the Hapi API </h1>";
        },
      },
    ]),
};

export default ApplicationRoutes;
