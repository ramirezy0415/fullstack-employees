import db from "#db/client";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employeeList = [
    {
      name: "Alice Johnson",
      birthday: "1985-05-15",
      salary: 75000,
    },
    {
      name: "Bob Smith",
      birthday: "1992-11-20",
      salary: 62000,
    },
    {
      name: "Charlie Brown",
      birthday: "1978-01-01",
      salary: 95000,
    },
    {
      name: "Diana Prince",
      birthday: "1995-07-30",
      salary: 58000,
    },
    {
      name: "Ethan Hunt",
      birthday: "1988-03-10",
      salary: 110000,
    },
    {
      name: "Fiona Glenn",
      birthday: "1972-09-25",
      salary: 85000,
    },
    {
      name: "George Costanza",
      birthday: "1965-04-12",
      salary: 55000,
    },
    {
      name: "Hannah Montana",
      birthday: "2000-12-05",
      salary: 48000,
    },
    {
      name: "Ivan Drago",
      birthday: "1980-06-18",
      salary: 48000,
    },
  ];

  for (const employee of employeeList) {
    console.log(`Loading: ${employee.name}`);
    await createEmployee(employee);
  }
}
