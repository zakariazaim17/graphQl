import Category from "../model/category.js";

const categoryData = [
  {
    id: "1",
    categoryName: "Mammal",
  },
  {
    id: "2",
    categoryName: "ma3raft",
  },
];

export default {
  Species: {
    category: (parent, args) => {
      return Category.findById(parent.category);
    },
  },
  Mutation: {
    addCategory: (parent, args) => {
      console.log(args);
      const newCat = new Category(args);
      return newCat.save();
    },
  },
};
