import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
{
  _id: String,
  title: String,
  course: String,

  description: String,

  published: { type: Boolean, default: false },

  quizType: { type: String, default: "Graded Quiz" },
  assignmentGroup: { type: String, default: "Quizzes" },

  points: { type: Number, default: 0 },

  shuffleAnswers: { type: Boolean, default: true },
  timeLimit: { type: Number, default: 20 },

  multipleAttempts: { type: Boolean, default: false },
  howManyAttempts: { type: Number, default: 1 },

  showCorrectAnswers: { type: String, default: "Immediately" },

  accessCode: { type: String, default: "" },

  oneQuestionAtATime: { type: Boolean, default: true },
  webcamRequired: { type: Boolean, default: false },
  lockQuestionsAfterAnswering: { type: Boolean, default: false },

  dueDate: String,
  availableDate: String,
  untilDate: String,

  questions: { type: Array, default: [] }
},
{ collection: "quizzes" }
);

export default quizSchema;
