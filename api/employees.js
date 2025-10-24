import express from "express";
const router = express.Router();
export default router;

import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../db/queries/employees.js";

router.route("/").get(async (req, res) => {
  console.log("Get Employees");
  const employees = await getEmployees();
  res.send(employees);
});

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  console.log("Get Employee with id: ", id);
  const employee = await getEmployee(id);
  res.send(employee);
});

router.route("/").post(async (req, res) => {
  const newEmployee = req.body;
  console.log("Create Employee ", newEmployee);
  const employee = await createEmployee(newEmployee);
  res.send(employee);
});

router.route("/:id").put(async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Updating user with id: ", id);
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

router.route("/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting user with id: ", id);
    const deleted = await deleteEmployee(id);
    if (!deleted) {
      res.status(500).json({ error: "Failed to delete user with id: ", id });
    }
    return res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
  }
});
