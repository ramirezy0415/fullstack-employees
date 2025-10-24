import db from "#db/client";
/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  try {
    const query = `
    INSERT INTO employees (name, birthday, salary)
    VALUES ($1,$2,$3)
    RETURNING *;
    `;
    const values = [name, birthday, salary];
    const { rows } = await db.query(query, values);
    console.log(rows[0]);
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  // TODO
  try {
    const query = `SELECT * FROM employees`;
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  // TODO
  try {
    const query = `SELECT * FROM employees WHERE id = $1`;
    const values = [id];
    const { rows } = await db.query(query, values);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  // TODO
  try {
    const query = `
      UPDATE employees
      SET name = $1, birthday = $2, salary = $3
      WHERE id = $4
      RETURNING *;`;
    const values = [name, birthday, salary, id];
    const { rows } = await db.query(query, values);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  // TODO
  try {
    const query = `
  DELETE FROM employees
  WHERE id = $1
  RETURNING *;
  `;
    const values = [id];
    const { rows } = await db.query(query, values);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
