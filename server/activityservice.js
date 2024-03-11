const express = require("express");
const pool = require("./db");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const {
      activity_name,
      department_id,
      department_name,
      user_firstname,
      user_lastname,
      admin_firstname,
      admin_lastname,
      admin_email,
      admin_phone,
      admin_address,
      checker_firstname,
      checker_lastname,
    } = req.body;
    await pool.query(
      "INSERT INTO activitys (activity_name, department_id, department_name, user_firstname, user_lastname, admin_firstname, admin_lastname, admin_email, admin_phone, admin_address, checker_firstname, checker_lastname) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
      [
        activity_name,
        department_id,
        department_name,
        user_firstname,
        user_lastname,
        admin_firstname,
        admin_lastname,
        admin_email,
        admin_phone,
        admin_address,
        checker_firstname,
        checker_lastname,
      ]
    );
    res.status(200).send({
      message: `Activity created successfully!`,
    });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).send({
      message: `Error: ${e}`,
    });
  }
});

router.get("/activitys", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "activitys"');
    const users = result.rows;
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send({
      massage: `Error ${e}!`,
    });
  }
});

router.get("/getbyid", async (req, res) => {
  const { id } = req.query;
  try {
    const result = await pool.query('SELECT * FROM "activitys" WHERE id = $1', [
      id,
    ]);
    if (result.rows.length > 0) {
      const data = result.rows[0];
      res.status(200).send(data);
    } else {
      res.status(404).send({
        message: `Activity with ID ${id} not found`,
      });
    }
  } catch (e) {
    res.status(500).send({
      message: `Activity not found`,
    });
  }
});

router.get("/getbydeptid", async (req, res) => {
  const { id } = req.query;
  try {
    const result = await pool.query(
      'SELECT * FROM "activitys" WHERE department_id = $1',
      [id]
    );
    if (result.rows.length > 0) {
      const data = result.rows[0];
      res.status(200).send(data);
    } else {
      res.status(404).send({
        message: `Activity with ID ${id} not found`,
      });
    }
  } catch (e) {
    res.status(500).send({
      message: `Activity not found`,
    });
  }
});
module.exports = router;
