import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: String,
  mcAnswer: Number,
  tfAnswer: Boolean,
  fillBlankAnswer: String,
  correct: Boolean,
}, { _id: false });

const attemptSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: String,           // quiz _id
    user: String,           // student _id
    course: String,         // course _id
    answers: { type: [answerSchema], default: [] },
    score: { type: Number, default: 0 },
    attemptNumber: { type: Number, default: 1 },
    submittedAt: { type: Date, default: Date.now },
  },
  { collection: "quiz_attempts" }
);

export default attemptSchema;