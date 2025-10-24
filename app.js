import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./db/queries/employees.js";
const app = express();
export default app;

// TODO: this file!

// Middleware to parse test
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

app.route("/employees/:id").put(async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Updating id: ", id);
    const { name, birthday, salary } = req.body;
    if (!id || !name || !birthday || !salary) {
      return res.status(400).json({ error: "Bad Request" });
    }

    const updated = await updateEmployee({ id, name, birthday, salary });
    console.log(updated);
    if (!updated) {
      return res.status(404).json({ error: "Movie not found" });
    }
    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.route("/employees/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteEmployee(id);
    if (!deleted) {
      res.status(500).json({ error: "Failed to delete user with id: ", id });
    }
    return res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
  }
});
