import * as Hapi from "hapi";

export default class Swagger {
  public static async registerSwagger(server: Hapi.Server): Promise<void> {
    try {
      return server.register([
        require("inert"),
        require("vision"),
        {
          plugin: require("hapi-swagger"),
          options: {
            info: {
              title: "User Api",
              description: "User Api Documentation",
              version: require("../../package").version
            }
          }
        }
      ]);
    } catch (err) {
      console.log(`Error registering swagger plugin: ${err}`);
    }
  }
}
