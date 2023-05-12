import QuizModel from "../Model/QuizModel.js";
import { SendError } from "../Utils/SendError.js";

//  CreateQuiz
export const createQuiz = async (req, res) => {
  try {
    // get Quiz field 
    const { quizname, QuestionData } = req.body;
    if (!QuestionData) {
      let message = "QuestionData Field is  Data is required"
      return SendError(res, 404, false, message, null);
    }
    if (QuestionData.length == 0) {
      let message = "QuestionData is  Data is required"
      return SendError(res, 404, false, message, null);
    }



    //  crate Quiz document
    const QuizData = new QuizModel({
      quizname,
      QuestionData,
      startDate: Date.now(),
      status: "active",
      endDate: Date.now() + 1000 * 60 * 5,
    });

    // When the time for the quiz is over, the finished will be stored in the status field.
    setTimeout(async () => {
      QuizData.status = "finished";
      await QuizData.save();
    }, 1000 * 60 * 5);

    //  Save Quiz document in database
    await QuizData.save();
    let message = "Quiz Created Successfully.......";

    res.status(201).json({ message, success: true });
  } catch (error) {
    SendError(res, 500, false, null, error);
  }
};

// Get All Quiz
export const GetAllQuiz = async (req, res) => {
  try {
    const AllQuiz = await QuizModel.find();
    res.status(200).json({ AllQuiz, success: true });
  } catch (error) {
    SendError(res, 500, false, null, error);
  }
};

// Get Active Quiz
export const GetActiveQuiz = async (req, res) => {
  try {
    const ActiveQuiz = await QuizModel.find({ status: "active" });
    if (ActiveQuiz.length == 0) {
      let message = "Active Quiz is not available";
      return SendError(res, 500, false, message, null);
    }
    res.status(200).json({ ActiveQuiz, success: true });
  } catch (error) {
    SendError(res, 500, false, null, error);
  }
};

//  get Quiz Result
export const Quizresult = async (req, res) => {
  const quizId = req.params.id;

  try {
    // check quiz id is valid or not
    let getFinishedQuiz = await QuizModel.findOne({
      _id: quizId,
    });

    if (!getFinishedQuiz) {
      let message = "This Quiz is not Found";
      return SendError(res, 404, false, message, null);
    }
    // get Finished Quiz
    getFinishedQuiz = await QuizModel.findOne({
      _id: quizId,
      status: "finished",
    });

    if (!getFinishedQuiz) {
      let message = "This Quiz is not Finished";
      return SendError(res, 400, false, message, null);
    }
    return res.status(200).json({ message: "you have passed this quiz" });
  } catch (error) {
    SendError(res, 500, false, null, error);
  }
};
