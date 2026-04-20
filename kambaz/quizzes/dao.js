import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizzesDao() {

  function findQuizzesForCourse(courseId) {
    return model.find({ course: courseId });
  }

  function findQuizById(quizId) {
    return model.findOne({ _id: quizId });
  }

  function createQuiz(quiz) {
    const newQuiz = {
      ...quiz,
      _id: uuidv4()
    };

    return model.create(newQuiz);
  }

  function deleteQuiz(quizId) {
    return model.deleteOne({ _id: quizId });
  }

  function updateQuiz(quizId, updates) {
    return model.updateOne(
      { _id: quizId },
      { $set: updates }
    );
  }

  return {
    findQuizzesForCourse,
    findQuizById,
    createQuiz,
    deleteQuiz,
    updateQuiz
  };
}
