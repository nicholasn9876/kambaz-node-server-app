import AttemptsDao from "./dao.js";
import QuizzesDao from "../dao.js";

export default function AttemptsRoutes(app) {
  const attemptsDao = AttemptsDao();
  const quizzesDao = QuizzesDao();

  // helper
  const gradeAttempt = (quiz, answers) => {
  let score = 0;
  const gradedAnswers = answers.map((a) => {
    const question = (quiz.questions || []).find((q) => q._id === a.questionId);
    if (!question) return { questionId: a.questionId, correct: false };

    const userAns = a.answer;
    let correct = false;
    const result = { questionId: a.questionId };

    if (question.type === "TRUE_FALSE") {
      result.tfAnswer = Boolean(userAns);
      correct = Boolean(userAns) === Boolean(question.correctAnswer);
    } else if (question.type === "MULTIPLE_CHOICE") {
      const num = Number(userAns);
      if (!isNaN(num)) {
        result.mcAnswer = num;
      }
      correct = userAns === question.correctAnswer;
    } else if (question.type === "FILL_IN_BLANK") {
      result.fillBlankAnswer = String(userAns || "");
      const possible = (question.possibleAnswers || []).map((p) =>
        String(p).trim().toLowerCase()
      );
      correct = possible.includes(String(userAns || "").trim().toLowerCase());
    }

    if (correct) score += question.points || 0;
    result.correct = correct;
    return result;
  });

  return { score, gradedAnswers };
};

  const getAttemptsForStudent = async (req, res) => {
    const { quizId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);

    const attempts = await attemptsDao.findAttemptsForQuizAndUser(
      quizId,
      currentUser._id
    );
    res.json(attempts);
  }

  const getLatestAttemptForStudent = async (req, res) => {
    const { quizId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);

    const attempt = await attemptsDao.findLatestAttempt(quizId, currentUser._id);
    res.json(attempt);
  }

  const submitNewAttempt = async (req, res) => {
    const { quizId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);

    const quiz = await quizzesDao.findQuizById(quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    // Enforce attempt limit
    const count = await attemptsDao.countAttempts(quizId, currentUser._id);
    const maxAttempts = quiz.multipleAttempts ? quiz.howManyAttempts || 1 : 1;
    if (count >= maxAttempts) {
      return res.status(403).json({ error: "No attempts remaining" });
    }

    const { answers } = req.body;
    const { score, gradedAnswers } = gradeAttempt(quiz, answers || []);

    const newAttempt = await attemptsDao.createAttempt({
      quiz: quizId,
      user: currentUser._id,
      course: quiz.course,
      answers: gradedAnswers,
      score,
    });

    res.json(newAttempt);
  }

  app.get("/api/quizzes/:quizId/attempts", getAttemptsForStudent);
  app.get("/api/quizzes/:quizId/attempts/latest", getLatestAttemptForStudent);
  app.post("/api/quizzes/:quizId/attempts", submitNewAttempt);
}