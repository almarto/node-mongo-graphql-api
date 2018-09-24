import * as Hapi from "hapi";
import * as mongoose from "mongoose";

import Router from "./routes";
import dbConfig from "./config/database";

class Server {
  private _instance: Hapi.Server;

  constructor() {
    this._instance = new Hapi.Server({
      host: "localhost",
      port: 3000,
    });
  }

  public async start(): Promise<Hapi.Server> {
    try {
      mongoose.connect(dbConfig.url);
      mongoose.connection.once("open", () =>
        console.log("connected to database"),
      );

      this._instance = new Hapi.Server({
        host: "localhost",
        port: 3000,
      });

      await Router.loadRoutes(this._instance);

      await this._instance.start();

      console.log(`Server - Up and running!`);

      return this._instance;
    } catch (error) {
      console.log(`Server - There was something wrong: ${error}`);
    }
  }
}

(async () => {
  await new Server().start();
})();
