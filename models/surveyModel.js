import mongoose from "mongoose";

const surveySchema = new mongoose.Schema(
  {
    completedUsers: {
      type: Array,
    },
    survey: {
      type: String,
      require: true,
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
