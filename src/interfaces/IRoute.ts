import * as Hapi from "hapi";

export interface IRoute {
  name: string;
  version: string;
  register: (server: Hapi.Server) => void;
}
