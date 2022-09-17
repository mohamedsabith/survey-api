import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address.");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

userSchema.index({ username: 1, email: 1 });

const userModel = mongoose.model("User", userSchema);

export default userModel;
