import Species from "../models/species.js";

export default {
  Animal: {
    species(parent) {
      console.log("species", parent);
      return Species.findById(parent.species);
    },
  },
  Mutation: {
    addSpecies: (parent, args) => {
      console.log("addSpecies, Species REsolver", args);
      const newSpecies = new Species(args);
      return newSpecies.save();
    },
  },
};
