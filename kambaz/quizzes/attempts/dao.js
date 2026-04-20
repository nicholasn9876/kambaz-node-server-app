import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AttemptsDao() {
  function findAttemptsForQuizAndUser(quizId, userId) {
    return model.find({ quiz: quizId, user: userId }).sort({ attemptNumber: 1 });
  }

  function findLatestAttempt(quizId, userId) {
    return model.findOne({ quiz: quizId, user: userId }).sort({ attemptNumber: -1 });
  }

  function countAttempts(quizId, userId) {
    return model.countDocuments({ quiz: quizId, user: userId });
  }

  async function createAttempt(attempt) {
    const existingCount = await countAttempts(attempt.quiz, attempt.user);
    const newAttempt = {
      ...attempt,
      _id: uuidv4(),
      attemptNumber: existingCount + 1,
      submittedAt: new Date(),
    };
    return model.create(newAttempt);
  }

  function findAttemptById(attemptId) {
    return model.findOne({ _id: attemptId });
  }

  return {
    findAttemptsForQuizAndUser,
    findLatestAttempt,
    countAttempts,
    createAttempt,
    findAttemptById,
  };
}