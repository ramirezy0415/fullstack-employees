import express from "express";
const app = express();
export default app;
import router from "./api/employees.js";

// Middleware to parse test
app.use(express.json());

app.route("/").get((req, res) => {
  console.log("Request made");
  res.send("Welcome to the Fullstack Employees API.");
});

app.use("/employees", router);
