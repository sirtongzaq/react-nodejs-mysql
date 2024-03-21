const express = require("express");
const db = require("./db");

const router = express.Router();

router.post("/create", async (req, res) => {
  const {
    act_id,
    act_name,
    datacontroller_firstname,
    datacontroller_lastname,
    datacontroller_email,
    datacontroller_number,
    datacontroller_contact_place,
    recorder_firstname,
    recorder_lastname,
    dept_id,
    dept_name,
    dpo_firstname,
    dpo_lastname,
    dpo_contact_place,
    dpo_email,
    dpo_number,
    recordreviewer_firstname,
    recordreviewer_lastname,
  } = req.body;
  const insertQuery = `INSERT INTO activitys (act_id,
      act_name,
      datacontroller_firstname,
      datacontroller_lastname,
      datacontroller_email,
      datacontroller_number,
      datacontroller_contact_place,
      recorder_firstname,
      recorder_lastname,
      dept_id,
      dept_name,
      dpo_firstname,
      dpo_lastname,
      dpo_contact_place,
      dpo_email,
      dpo_number,
      recordreviewer_firstname,
      recordreviewer_lastname) 
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  db.query(
    insertQuery,
    [
      act_id,
      act_name,
      datacontroller_firstname,
      datacontroller_lastname,
      datacontroller_email,
      datacontroller_number,
      datacontroller_contact_place,
      recorder_firstname,
      recorder_lastname,
      dept_id,
      dept_name,
      dpo_firstname,
      dpo_lastname,
      dpo_contact_place,
      dpo_email,
      dpo_number,
      recordreviewer_firstname,
      recordreviewer_lastname,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting activity data:", err);
        res.status(500).json({ message: "Error inserting activity data" });
        return;
      }
      console.log("Activity data inserted successfully");
      res.status(200).json({ message: "Activity data inserted successfully" });
    }
  );
});

router.get("/activitys", async (req, res) => {
  const query = "SELECT * FROM activitys";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error retrieving activitys" });
      return;
    }
    res.status(200).json(result);
  });
});

router.get("/activity", async (req, res) => {
  const { id } = req.query;
  const query = `SELECT * FROM activitys WHERE act_id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error retrieving activity" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "Activity not found" });
    } else {
      res.status(200).json(result[0]);
    }
  });
});

router.get("/getactivitybydept", async (req, res) => {
  const { id } = req.query;
  const query = `SELECT * FROM activitys WHERE dept_id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error retrieving user" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "Activity not found" });
    } else {
      res.status(200).json(result);
    }
  });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.query;
  const deleteActivityQuery = `DELETE FROM activitys WHERE act_id = ?`;

  db.query(deleteActivityQuery, [id], (err, activityResult) => {
    if (err) {
      console.error("Error deleting activity:", err);
      return res.status(500).json({ message: "Error deleting activity" });
    }

    if (activityResult.affectedRows === 0) {
      return res.status(404).json({ message: "Activity not found" });
    }

    const deleteMeasuresQuery = `DELETE FROM measures WHERE act_id = ?`;
    db.query(deleteMeasuresQuery, [id], (err, measuresResult) => {
      if (err) {
        console.error("Error deleting measures:", err);
        return res.status(500).json({ message: "Error deleting measures" });
      }

      const deleteDataInactivityQuery = `DELETE FROM datainactivity WHERE act_id = ?`;
      db.query(deleteDataInactivityQuery, [id], (err, dataResult) => {
        if (err) {
          console.error("Error deleting data inactivity:", err);
          return res
            .status(500)
            .json({ message: "Error deleting data inactivity" });
        }

        let message;
        if (measuresResult.affectedRows > 0 || dataResult.affectedRows > 0) {
          message =
            "Activity and associated measures/data inactivity deleted successfully";
        } else {
          message =
            "Activity deleted successfully, no associated measures/data inactivity";
        }
        res.status(200).json({ message });
      });
    });
  });
});

router.put("/activity", async (req, res) => {
  const { id, newData } = req.body;

  if (!newData) {
    return res.status(400).json({ message: "New data for update is missing" });
  }

  const query = `UPDATE activitys SET ? WHERE act_id = ?`;

  db.query(query, [newData, id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error updating activity" });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Activity not found" });
    } else {
      res.status(200).json({ message: "Activity updated successfully" });
    }
  });
});

module.exports = router;
