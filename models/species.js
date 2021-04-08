import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SpeciesSchema = new Schema({
  speciesName: String,
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
});
export default mongoose.model("Species", SpeciesSchema);
