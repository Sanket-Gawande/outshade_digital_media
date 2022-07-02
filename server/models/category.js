import mongoose from "mongoose";

const category = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  thumbnail: { type: String, required: true },
  id: { type: String, required: true },
});

const categoryModel = mongoose.model("category", category);

export default categoryModel;
