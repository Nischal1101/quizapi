import mongoose from "mongoose";
const quizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    questions_list: [
      {
        question_number: Number,
        question: String,
        options: {},
      },
    ],
    answers: {},
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    is_published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
