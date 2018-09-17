import * as Hapi from "hapi";

import { User, IUserModel } from "../models/User";
import { IRoute } from "../interfaces/IRoute";

interface UserRequest extends Hapi.Request {
  payload: IUserModel;
}

const UserRoutes: IRoute = {
  name: "user_api",
  version: "1.0.0",
  register: async (server: Hapi.Server) =>
    server.route([
      {
        path: "/users",
        method: "GET",
        handler: (request: UserRequest, h) => {
          return User.find({}, err => err && console.log(err));
        }
      },
      {
        path: "/users",
        method: "POST",
        handler: (request: UserRequest, h) => {
          const {
            firstName,
            lastName,
            email,
            mobile,
            hobbies
          } = request.payload;

          const user = new User({
            firstName,
            lastName,
            email,
            mobile,
            hobbies
          });

          return user.save();
        }
      },
      {
        path: "/users/{userId}",
        method: "GET",
        handler: (request: UserRequest, h) => {
          return User.findById(request.params.userId);
        }
      },
      {
        path: "/users/{userId}",
        method: "PUT",
        handler: (request: UserRequest, h) => {
          return User.findByIdAndUpdate(
            request.params.userId,
            { ...request.payload },
            { new: true }
          );
        }
      },
      {
        path: "/users/{userId}",
        method: "DELETE",
        handler: (request: UserRequest, h) => {
          return User.findByIdAndDelete(request.params.userId);
        }
      }
    ])
};

export default UserRoutes;
