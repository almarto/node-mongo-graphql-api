const Hapi = require("hapi");
const mongoose = require("mongoose");

const configDB = require("./config/database.js");
const User = require("./models/User");

// configuration ===============================================================
mongoose.connect(
  configDB.url,
  { useNewUrlParser: true }
); // connect to our database

mongoose.connection.once("open", () => console.log("connected to database"));

const server = Hapi.server({ port: 3000, host: "localhost" });

const init = async () => {
  server.route([
    {
      path: "/",
      method: "GET",
      handler: (request, h) => {
        return "<h1>Welcome to the Hapi API </h1>";
      }
    },
    {
      path: "/api/v1/users",
      method: "GET",
      handler: (request, h) => {
        return User.find();
      }
    },
    {
      path: "/api/v1/users",
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
      path: "/api/v1/users/{userId}",
      method: "GET",
      handler: (request, h) => {
        return User.findById(request.params.userId);
      }
    },
    {
      path: "/api/v1/users/{userId}",
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
      path: "/api/v1/users/{userId}",
      method: "DELETE",
      handler: (request, h) => {
        return User.findByIdAndDelete(request.params.userId);
      }
    }
  ]);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
