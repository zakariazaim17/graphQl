import pkg from "apollo-server-express";
const { gql } = pkg;

export default gql`
  extend type Query {
    login(username: String!, password: String!): User
  }
  type User {
    id: ID
    username: String
    token: String
  }
`;
