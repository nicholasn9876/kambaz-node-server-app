const assignment = {
  id: 1, title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10", completed: false, score: 0,
};
const module = {
  id: 1, title: "Lecture 16, 17, Assignment 5",
  description: "Implementing RESTful APIs with Express.js",
  course: "CS4550"
}
export default function WorkingWithObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
   const setAssignmentTitle = (req, res) => {
   const { newTitle } = req.params;
   assignment.title = newTitle;
   res.json(assignment);
 };

 const getModule = (req, res) => {
  res.json(module);
 }
 const getModuleName = (req, res) => {
  res.json(module.title);
 }
 const setModuleName = (req, res) => {
  const { newTitle } = req.params;
  module.title = newTitle;
  res.json(module);
 }
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment", getAssignment);
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/module", getModule);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module/name/:newTitle", setModuleName);
};

