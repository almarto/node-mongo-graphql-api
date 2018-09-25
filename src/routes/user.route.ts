import * as Hapi from "hapi";

import { IRoute } from "../interfaces/IRoute";
import { UserController } from "../controllers/user.controller";

const UserRoutes: IRoute = {
  name: "user_api",
  version: "1.0.0",
  register: async (server: Hapi.Server) => {
    await server.route([
      {
        path: "/users",
        method: "GET",
        options: {
          handler: UserController.list,
          description: "Get Users",
          notes: "Returns a list with all the users availables in the system",
          tags: ["api", "v1", "users"]
        }
      },
      {
        path: "/users",
        method: "POST",
        options: {
          handler: UserController.create
        }
      },
      {
        path: "/users/{userId}",
        method: "GET",
        options: {
          handler: UserController.get
        }
      },
      {
        path: "/users/{userId}",
        method: "PUT",
        options: {
          handler: UserController.update
        }
      },
      {
        path: "/users/{userId}",
        method: "DELETE",
        options: {
          handler: UserController.remove
        }
      }
    ]);
  }
};

export default UserRoutes;
