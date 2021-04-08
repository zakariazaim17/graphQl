import pkg from "apollo-server-express";
const { ApolloServer } = pkg;
import schemas from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import express from "express";
import dotenv from "dotenv";
import connectMongo from "./db/db.js";
import pkk from "./passport/authenticate.js";
const { checkAuth } = pkk;
import localhost from "./security/localhost.js";
import production from "./security/production.js";
import bcrypt from "bcrypt";
import helmet from "helmet";

dotenv.config();

(async () => {
  try {
    const conn = await connectMongo();
    if (conn) {
      console.log("Connected to DB!");
    }
    const server = new ApolloServer({
      typeDefs: schemas,
      resolvers,
      context: async ({ req, res }) => {
        if (req) {
          const user = await checkAuth(req, res);
          console.log("app", user);
          return {
            req,
            res,
            user,
          };
        }
      },
    });

    const saltRound = 12; //okayish in 2021

    // inside your user create/update async function
    const myPwd = "bar";
    const hash = await bcrypt.hash(myPwd, saltRound);
    console.log("hashed pwd :", hash);

    const app = express();

    server.applyMiddleware({ app });

    process.env.NODE_ENV = process.env.NODE_ENV || "development";
    if (process.env.NODE_ENV === "production") {
      production(app, 3000);
    } else {
      localhost(app, 8000, 3000);
    }
    /*app.listen({ port: 3001 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:3001${server.graphqlPath}`
      )
    );*/
  } catch (e) {
    console.log("server error: " + e.message);
  }
})();
