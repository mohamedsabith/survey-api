import mongoose from "mongoose";

const surveySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    survey: {
      type: Array,
      default: [],
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

const surveyModel = mongoose.model("Survey", surveySchema);

export default surveyModel;
