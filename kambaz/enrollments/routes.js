import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  const getEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.getEnrollmentsForUser(userId);
    res.json(enrollments);
  }
  const enroll = (req, res) => {
    const { userId, courseId } = req.params;
    const status = dao.enrollUserInCourse(userId, courseId);
    res.send(status);
  }
  const unenroll = (req, res) => {
    const { userId, courseId } = req.params;
    const status = dao.unenrollUserFromCourse(userId, courseId);
    res.send(status)
  }

  app.get("/api/enrollments/:userId", getEnrollmentsForUser);
  app.post("/api/enrollments/:userId/:courseId", enroll);
  app.delete("/api/enrollments/:userId/:courseId", unenroll);
}