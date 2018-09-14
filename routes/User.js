const User = require("../models/User");

exports.plugin = {
  name: "api",
  version: "1.0.0",
  register: async server => {
    server.route([
      {
        path: "/users",
        method: "GET",
        handler: (request, h) => {
          return User.find();
        }
      },
      {
        path: "/users",
        method: "POST",
        handler: (request, h) => {
          const { name, surname, email, mobile, hobbies } = request.payload;
          const user = new User({
            name,
            surname,
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
        handler: (request, h) => {
          return User.findById(request.params.userId);
        }
      },
      {
        path: "/users/{userId}",
        method: "PUT",
        handler: (request, h) => {
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
        handler: (request, h) => {
          return User.findByIdAndDelete(request.params.userId);
        }
      }
    ]);
  }
};
