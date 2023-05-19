import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import typeDefs from "./schemas/typeDefs";
import resolvers from "./resolvers/index";
import log4js from "./log4js";
import neo4j from "neo4j-driver";
import config from "./configs/index";
log4js();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (formattedError: any) => {
    // console.error("lỗi nè");
    if (
      formattedError.extensions.code === ApolloServerErrorCode.BAD_USER_INPUT
    ) {
      const variableName = formattedError.message.match(
        /Variable "(.+)" of required type/
      )[1];
      return {
        ...formattedError,
        message: `Không được bỏ trống ${variableName.replace("$", "")}`,
      };
    }
    return formattedError;
  },
});

startStandaloneServer(server, {
  context: async () =>
    neo4j.driver(
      config.NEO4J.NEO4J_HOST,
      neo4j.auth.basic(
        config.NEO4J.NEO4J_USERNAME,
        config.NEO4J.NEO4J_PASSWORD
      ),
      {
        disableLosslessIntegers: config.NEO4J.disableLosslessIntegers,
        maxConnectionPoolSize: config.NEO4J.maxConnectionPoolSize,
      }
    ),
  listen: { port: 3000 },
}).then((i: any) => {
  console.log(`🚀  Server ready at: ${i.url}`);
});
