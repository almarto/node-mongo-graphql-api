import * as Hapi from "hapi";
import * as mongoose from "mongoose";
import { ApolloServer } from "apollo-server-hapi";

import Router from "./routes";
import dbConfig from "./config/database";
import AppGraphqlSchema from "./graphql/schema";

class Server {
  private _instance: Hapi.Server;

  constructor() {
    this._instance = new Hapi.Server({
      host: "localhost",
      port: 3000
    });
  }

  public async start(): Promise<Hapi.Server> {
    try {
      mongoose.connect(
        dbConfig.url,
        { useNewUrlParser: true }
      );
      mongoose.connection.once("open", () =>
        console.log("connected to database")
      );

      const server = new ApolloServer({ schema: AppGraphqlSchema });

      this._instance = new Hapi.Server({
        host: "localhost",
        port: 3000
      });

      await server.applyMiddleware({
        app: this._instance
      });
      await server.installSubscriptionHandlers(this._instance.listener);

      await Router.loadRoutes(this._instance);

      await this._instance.start();

      console.log(
        `🚀 Server - Up and running!`,
        `Apollo server ready at http://localhost:${this._instance.info.port}${
          server.graphqlPath
        }`
      );

      return this._instance;
    } catch (error) {
      console.log(`Server - There was something wrong: ${error}`);
    }
  }
}

(async () => {
  await new Server().start();
})();
