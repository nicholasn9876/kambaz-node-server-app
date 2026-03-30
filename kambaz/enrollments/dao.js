import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function getEnrollmentsForUser(userId) {
    const { enrollments } = db;
    return enrollments.filter((enrollment) => enrollment.user === userId);
  }
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }
  function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments = enrollments.filter((enrollment) => !(enrolllment._id === userId && enrollment.courseId === courseId));
  }
  return { enrollUserInCourse, unenrollUserFromCourse, getEnrollmentsForUser };
}
