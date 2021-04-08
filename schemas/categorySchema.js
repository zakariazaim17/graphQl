import pkg from "apollo-server-express";
const { gql } = pkg;
export default gql`
  type Category {
    id: ID
    categoryName: String
  }
  extend type Mutation {
    addCategory(categoryName: String): Category
  }
`;
