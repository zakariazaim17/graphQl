import Species from "../model/species.js";

const speciesData = [
  {
    id: "1",
    speciesName: "Cat",
    category: "1",
  },
  {
    id: "2",
    speciesName: "Dog",
    category: "2",
  },
];

export default {
  Animal: {
    species(parent) {
      console.log("species", parent);
      return Species.findById(parent.species);
    },
  },
  Mutation: {
    addSpecies: (parent, args) => {
      console.log(args);
      const newSpecie = new Species(args);
      return newSpecie.save();
    },
  },
};
