import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      required: [true, "question is required"],
      type: String,
    },
    options: {
      type: Array,
      default: [],
    },
    survey: {
      type: mongoose.Types.ObjectId,
      ref: "Survey",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

const questionModel = mongoose.model("Question", questionSchema);

export default questionModel;
