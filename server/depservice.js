const express = require("express");
const pool = require("./db");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { depname } = req.body;
    const result = await pool.query(
      'SELECT * FROM "departments" WHERE "dep_name" = $1',
      [depname]
    );
    if (result.rows.length > 0) {
      res.status(401).send({ message: "departmentname is already taken" });
    } else {
      await pool.query('INSERT INTO "departments" (dep_name) VALUES ($1)', [
        depname,
      ]);
      res.status(200).send({
        message: `Departments cretae succesfully! ${depname} `,
      });
    }
  } catch (e) {
    res.status(500).send({
      massage: `Error ${e}!`,
    });
  }
});

router.get("/departments", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "departments"');
    const users = result.rows;
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send({
      massage: `Error ${e}!`,
    });
  }
});

module.exports = router;
