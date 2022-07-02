import mongoose from "mongoose";

const reqString = { type: String, required: true };
const product = mongoose.Schema({
  name: reqString,
  price: reqString,
  category: reqString,
  thumbnail: reqString,
  id : reqString,
  date: {
    type: Date,
    default: new Date(),
  },
});

const productModel = mongoose.model("product", product);
export default productModel;
