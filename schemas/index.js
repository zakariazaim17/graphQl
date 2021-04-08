import animalSchema from "./animalSchema.js";
import speciesSchema from "./speciesSchema.js";
import categorySchema from "./categorySchema.js";
import pkg from "apollo-server-express";
const { gql } = pkg;

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, animalSchema, speciesSchema, categorySchema];
