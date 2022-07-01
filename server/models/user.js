import mongoose from "mongoose";

const reqString = { type: String, required: true };
const user = mongoose.Schema({
  username: reqString,
  password: reqString,
  name: reqString,
  token: String,
  joinedOn: {
    type: Date,
    default: new Date(),
  },
});


export const userModel = mongoose.model("user" , user)