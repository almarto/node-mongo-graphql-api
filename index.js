const Hapi = require("hapi");
const mongoose = require("mongoose");

const configDB = require("./config/database.js");
const User = require("./models/User");

mongoose.connect(
  configDB.url,
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => console.log("connected to database"));

const server = Hapi.server({ port: 3000, host: "localhost" });

const registerRoutes = async () => {
  await server.register(require("./routes/application.js"));
  await server.register(require("./routes/User"), {
    routes: {
      prefix: "/api/v0"
    }
  });
};

const init = async () => {
  await registerRoutes();

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
