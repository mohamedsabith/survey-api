import mongoose from "mongoose";

const admin = mongoose.Schema({
  username: String,
  password: String,
});

const adminModel = mongoose.model("Admin", admin);

export default adminModel;
