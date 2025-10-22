import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
} from "./db/queries/employees.js";
const app = express();
export default app;

// TODO: this file!

app.use(express.json());

app.route("/").get((req, res) => {
  console.log("Request made");
  res.send("Welcome to the Fullstack Employees API.");
});

app.route("/employees").get(async (req, res) => {
  console.log("Get Employees");
  const employees = await getEmployees();
  res.send(employees);
});

app.route("/employees/:id").get(async (req, res) => {
  const { id } = req.params;
  console.log("Get Employee with id: ", id);
  const employee = await getEmployee(id);
  res.send(employee);
});

app.route("/employees").post(async (req, res) => {
  const newEmployee = req.body;
  console.log("Create Employee ", newEmployee);
  const employee = await createEmployee(newEmployee);
  res.send(employee);
});
