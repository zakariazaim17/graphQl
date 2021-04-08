import pkg from "apollo-server-express";

import pkk from "../passport/authenticate.js";
const { login } = pkk;
const { AuthenticationError } = pkg;
export default {
  Query: {
    login: async (parent, args, { req, res }) => {
      req.body = args;

      try {
        const authResponse = await login(req, res);
        console.log("authResponse", authResponse);
        return {
          id: authResponse.user.id,
          username: authResponse.user.username,
          token: authResponse.token,
        };
      } catch (e) {
        throw new AuthenticationError(e.message);
      }
    },
  },
};
