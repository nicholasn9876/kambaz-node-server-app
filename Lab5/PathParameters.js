export default function PathParameters(app) {
  const add = (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
  };
  const substract = (req, res) => {
    const { a, b } = req.params;
    const diff = parseInt(a) - parseInt(b);
    res.send(diff.toString());
  };
  const multiply = (req, res) => {
    const { a, b } = req.params;
    const prod = parseInt(a) * parseInt(b);
    res.send(prod.toString());
  }
  const divide = (req, res) => {
    const { a, b } = req.params;
    const quot = (parseInt(b) !== 0) ? parseInt(a) / (b) : "Cannot divide by 0.";
    res.send(quot.toString());
  }
  app.get("/lab5/add/:a/:b", add);
  app.get("/lab5/subtract/:a/:b", substract);
  app.get("/lab5/multiply/:a/:b", multiply);
  app.get("/lab5/divide/:a/:b", divide);
};
