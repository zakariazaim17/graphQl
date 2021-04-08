import Animal from "../models/animal.js";

export default {
  Query: {
    animals: (parent, args) => {
      return Animal.find();
    },
    animal: (parent, args) => {
      return Animal.findById(args.id);
    },
  },
  Mutation: {
    addAnimal: (parent, args) => {
      console.log("addAnimal, Animla Resolver", args);
      const newanimal = new Animal(args);
      return newanimal.save();
    },
    modifyAnimal: (parent, args) => {
      console.log("Modify animal REsolver", args);
      const data = {
        animalName: args.animalName,
        species: args.species,
      };
      return Animal.findByIdAndUpdate(args.id, data);
    },
  },
};
