import * as Hapi from "hapi";

import { IRoute } from "../interfaces/IRoute";
import { UserController } from "../controllers/user.controller";

const UserRoutes: IRoute = {
  name: "user_api",
  version: "1.0.0",
  register: async (server: Hapi.Server) =>
    server.route([
      {
        path: "/users",
        method: "GET",
        handler: UserController.list
      },
      {
        path: "/users",
        method: "POST",
        handler: UserController.create
      },
      {
        path: "/users/{userId}",
        method: "GET",
        handler: UserController.get
      },
      {
        path: "/users/{userId}",
        method: "PUT",
        handler: UserController.update
      },
      {
        path: "/users/{userId}",
        method: "DELETE",
        handler: UserController.remove
      }
    ])
};

export default UserRoutes;
