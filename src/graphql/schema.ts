import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString
} from "graphql";

import { UserType } from "./UserType";
import { GraphQLUserController } from "../controllers/user.controller";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: async (parent, args) => {
        const data = await GraphQLUserController.getById(args.id);
        return data.user;
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        const data = await GraphQLUserController.getAll();
        return data.users;
      }
    }
  }
});

const AppGraphqlSchema = new GraphQLSchema({ query: RootQuery });

export default AppGraphqlSchema;
