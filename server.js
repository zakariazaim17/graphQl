import pkg from "apollo-server-express";
const { ApolloServer } = pkg;
import schemas from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import express from "express";
import dotenv from "dotenv";
import connectMongo from "./db/db.js";

dotenv.config();

(async () => {
  try {
    const conn = await connectMongo();
    if (conn) {
      console.log("Connected successfully.");
    }

    const server = new ApolloServer({
      typeDefs: schemas,
      resolvers,
    });

    const app = express();

    server.applyMiddleware({ app });

    app.listen({ port: 3001 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:3001${server.graphqlPath}`
      )
    );
  } catch (e) {
    console.log("server error: " + e.message);
  }
})();
