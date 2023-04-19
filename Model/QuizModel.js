import mongoose from "mongoose";
const Quiz_Schema = mongoose.Schema({
  quizname: {
    type: String,
    required: [true, "Quiz name is Required"],
    trim: true,
  },
  QuestionData: [
    {
      question: { type: String, trim: true },
      options: [],
      rightAnswer: {
        type: Number,
        trim: true,
      },
    },
  ],
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    default: "inactive",
  },
});

const Quiz_Model = mongoose.model("Quiz", Quiz_Schema);
export default Quiz_Model;
