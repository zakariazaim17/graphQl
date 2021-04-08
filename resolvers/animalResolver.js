import Animals from "../model/animal.js";
import pkg from "apollo-server-express";
const { AuthenticationError } = pkg;

const animalData = [
  {
    id: "1",
    animalName: "Frank",
    species: "1",
  },
  {
    id: "2",
    animalName: "DADA",
    species: "2",
  },
];

export default {
  Query: {
    animals: (parent, args) => {
      return Animals.find();
    },
    animal: (parent, args) => {
      return Animals.findById(args.id);
    },
  },
  Mutation: {
    addAnimal: (parent, args, { user }) => {
      console.log("animal REsolver", args, user);
      if (!user) {
        return new AuthenticationError("You are not authenticated!");
      }
      const newAnimal = new Animals(args);
      return newAnimal.save();
    },

    modifyAnimal: (parent, args) => {
      console.log("Modify", args);
      const data = {
        animalName: args.animalName,
        species: args.species,
      };
      return Animals.findByIdAndUpdate(args.id, data);
    },
  },
};
