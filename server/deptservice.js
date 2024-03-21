const express = require("express");
const db = require("./db");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { dept_id, dept_name } = req.body;
  const checkQuery = `SELECT * FROM departments WHERE dept_id = ?`;
  db.query(checkQuery, [dept_id], async (err, result) => {
    if (err) {
      console.error("Error checking dept_id:", err);
      res.status(500).json({ message: "Error checking dept_id" });
      return;
    }
    if (result.length > 0) {
      console.log("Department with the provided ID already exists");
      res
        .status(401)
        .json({ message: "Department with the provided ID already exists" });
      return;
    }
    const insertQuery = `INSERT INTO departments (dept_id, dept_name) VALUES (?, ?)`;
    db.query(insertQuery, [dept_id, dept_name], (err, result) => {
      if (err) {
        console.error("Error inserting departments data:", err);
        res.status(500).json({ message: "Error inserting departments data" });
        return;
      }
      console.log("Department data inserted successfully");
      res
        .status(200)
        .json({ message: "Department data inserted successfully" });
    });
  });
});

router.get("/departments", async (req, res) => {
  const query = "SELECT * FROM departments";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error retrieving users" });
      return;
    }
    res.status(200).json(result);
  });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.query;
  const deleteQuery = `DELETE FROM departments WHERE dept_id= ?`;
  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error("Error deleting department:", err);
      res.status(500).json({ message: "Error deleting department" });
      return;
    }
    if (result.affectedRows > 0) {
      const deleteQueryActivity = `DELETE FROM activitys WHERE dept_id= ?`;
      db.query(deleteQueryActivity, [id], (err, activityResult) => {
        if (err) {
          console.error("Error deleting activities:", err);
          res.status(500).json({ message: "Error deleting activities" });
          return;
        }

        if (activityResult.affectedRows > 0) {
          res.status(200).json({
            message:
              "Department and associated activities deleted successfully",
          });
        } else {
          res.status(200).json({
            message:
              "Department deleted successfully, no associated activities",
          });
        }
      });
    } else {
      res.status(404).json({ message: "Department not found" });
    }
  });
});

router.get("/getdept", async (req, res) => {
  const { id } = req.query;
  const query = `SELECT * FROM departments WHERE dept_id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error retrieving department" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "Department not found" });
      return;
    } else {
      res.status(200).json(result[0]);
      return;
    }
  });
});

router.put("/department", async (req, res) => {
  const { id, newData } = req.body;

  if (!newData) {
    return res.status(400).json({ message: "New data for update is missing" });
  }

  const query = `UPDATE departments SET ? WHERE dept_id = ?`;

  db.query(query, [newData, id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error updating department" });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Department not found" });
    } else {
      res.status(200).json({ message: "Department updated successfully" });
    }
  });
});

module.exports = router;
