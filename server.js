// TODO: this file :)

//We import the express package to use its libary
const express = require("express");

// We call it to create the Express app
const app = express();

// We initialize the PORT variable. Common port number is 3000
const PORT = 3000;

// We import the employees array of objects to access it's data
const employees = require("./employees");

// This is the 'home'/initial screen message. This middleware to handle the GET /
app.get("/", (req, res) => {
  res.send("Hello employees!");
});

// This is the middleware to hadle the GET  /employees endpoint to access list of all employees in the database
app.get("/employees", (req, res) => {
  res.json(employees);
});

// This is the middleware to handle the GET /employees:id endpoint. It will return an "error" message with status code 404

app.get("/employees/:id", (req, res) => {
  const employeeId = parseInt(req.params.id, 10); // Convert id to an integer
  const employee = employees.find((emp) => emp.id === employeeId);

  if (employee) {
    res.json(employee); // Send the employee details as JSON
  } else {
    // Because we want to indicate an "error", we set the status code
    res.status(404).send("There is no employee with that id.");
  }
});

// Route to get a random employee
app.get("/employees/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  const randomEmployee = employees[randomIndex];
  res.json(randomEmployee);
});

// This is always at the end of the script! App starts to listen here.
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
