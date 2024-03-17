const express = require("express");
const db = require("./db");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { act_id, meas_org, meas_technical, meas_physic } = req.body;
  const insertQuery = `INSERT INTO measures (act_id,
    meas_org,
    meas_technical,
    meas_physic) 
      VALUES (?,?,?,?)`;
  db.query(
    insertQuery,
    [act_id, meas_org, meas_technical, meas_physic],
    (err, result) => {
      if (err) {
        console.error("Error inserting measure data:", err);
        res.status(500).json({ message: "Error inserting measure data" });
        return;
      }
      console.log("Measure data inserted successfully");
      res.status(200).json({ message: "Measure data inserted successfully" });
    }
  );
});

router.get("/measures", async (req, res) => {
  const query = "SELECT * FROM measures";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error retrieving measures" });
      return;
    }
    res.status(200).json(result);
  });
});

router.get("/measure", async (req, res) => {
  const { id } = req.query;
  const query = `SELECT * FROM measures WHERE meas_id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error retrieving measures" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "Measures not found" });
    } else {
      res.status(200).json(result[0]);
    }
  });
});

router.get("/getmeasuresbyact", async (req, res) => {
  const { id } = req.query;
  const query = `SELECT * FROM measures WHERE act_id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error retrieving measures" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "Measures not found" });
    } else {
      res.status(200).json(result);
    }
  });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.query;
  const deleteQuery = `DELETE FROM measures WHERE meas_id= ?`;
  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error("Error deleting measures:", err);
      res.status(500).json({ message: "Error deleting measures" });
      return;
    }
    if (result.affectedRows > 0) {
      res.status(200).json({
        message: "Measures deleted successfully",
      });
    } else {
      res.status(404).json({ message: "Measures not found" });
    }
  });
});

router.put("/measure", async (req, res) => {
  const { id, newData } = req.body;

  if (!newData) {
    return res.status(400).json({ message: "New data for update is missing" });
  }

  const query = `UPDATE measures SET ? WHERE meas_id = ?`;

  db.query(query, [newData, id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error updating measure" });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Measure not found" });
    } else {
      res.status(200).json({ message: "Measure updated successfully" });
    }
  });
});

module.exports = router;
