import express from "express";
import {
  createQuiz,
  GetAllQuiz,
  GetActiveQuiz,
  Quizresult,
} from "../Controller/Quiz.js";

const router = express.Router();

//   Create Quiz
router.post("/", createQuiz);

// Get All Quiz
router.get("/all", GetAllQuiz);

router.get("/active", GetActiveQuiz);
router.get("/:id/result", Quizresult);
export default router;
