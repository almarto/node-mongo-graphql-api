import * as Hapi from "hapi";

import ApplicationRoutes from "./application";
import UserRoutes from "./user";

export default class Router {
  public static async loadRoutes(server: Hapi.Server): Promise<any> {
    await server.register(ApplicationRoutes);
    await server.register(UserRoutes, {
      routes: {
        prefix: "/api/v1"
      }
    });
  }
}
