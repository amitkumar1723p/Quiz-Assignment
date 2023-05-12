import mongoose, { Schema } from "mongoose";
const Quiz_Schema = mongoose.Schema({
  quizname: {
    type: String,

    required: [true, "Quizname is Required"],
    minlength: [3, "At least 3 Character are required"],
    trim: true,
  },
  QuestionData: [

    {

      question: {
        type: String,
        trim: true,
        required: [true, "question is Required"],
      },
      options: {
        type: [String],
        required: [true, "options is required"],
        validate: (value) => {

          if (value.length == 0) {
            throw Error("options is required")
          }
          else if (value.length < 3) {
            throw Error("Array must have at least three element")
          }

        }


      },
      rightAnswer: {
        type: Number,
        trim: true,
        required: [true, "rightAnswer is required"],
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
