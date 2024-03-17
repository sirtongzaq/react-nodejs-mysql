const express = require("express");
const db = require("./db");

const router = express.Router();

router.post("/create", async (req, res) => {
  const {
    act_id,
    p_data_name,
    p_data_subject,
    p_data_source,
    p_data_type,
    p_data_type_detail,
    p_data_object,
    p_data_legal_base,
    p_data_time_period,
    p_data_storage,
    p_data_name_access,
    p_data_condition_name_access,
    p_data_how_to_access,
    p_data_condition_to_access,
    p_data_whouse_inorg,
    p_data_whouse_outorg,
    p_data_way_destroy,
    p_data_approve_destroy,
  } = req.body;
  const insertQuery = `INSERT INTO datainactivity (act_id,
    p_data_name,
    p_data_subject,
    p_data_source,
    p_data_type,
    p_data_type_detail,
    p_data_object,
    p_data_legal_base,
    p_data_time_period,
    p_data_storage,
    p_data_name_access,
    p_data_condition_name_access,
    p_data_how_to_access,
    p_data_condition_to_access,
    p_data_whouse_inorg,
    p_data_whouse_outorg,
    p_data_way_destroy,
    p_data_approve_destroy) 
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  db.query(
    insertQuery,
    [
      act_id,
      p_data_name,
      p_data_subject,
      p_data_source,
      p_data_type,
      p_data_type_detail,
      p_data_object,
      p_data_legal_base,
      p_data_time_period,
      p_data_storage,
      p_data_name_access,
      p_data_condition_name_access,
      p_data_how_to_access,
      p_data_condition_to_access,
      p_data_whouse_inorg,
      p_data_whouse_outorg,
      p_data_way_destroy,
      p_data_approve_destroy,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting datainactivity data:", err);
        res
          .status(500)
          .json({ message: "Error inserting datainactivity data" });
        return;
      }
      console.log("DataInActivity data inserted successfully");
      res
        .status(200)
        .json({ message: "DataInActivity data inserted successfully" });
    }
  );
});

router.get("/datainactivitys", async (req, res) => {
  const query = "SELECT * FROM datainactivity";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error retrieving datainactivity" });
      return;
    }
    res.status(200).json(result);
  });
});

router.get("/datainactivity", async (req, res) => {
  const { id } = req.query;
  const query = `SELECT * FROM datainactivity WHERE data_id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error retrieving datainactivity" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "DataInActivity not found" });
    } else {
      res.status(200).json(result[0]);
    }
  });
});

router.get("/getdatainactivitysbyact", async (req, res) => {
  const { id } = req.query;
  const query = `SELECT * FROM datainactivity WHERE act_id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error retrieving datainactivity" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "DataInActivity not found" });
    } else {
      res.status(200).json(result);
    }
  });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.query;
  const deleteQuery = `DELETE FROM datainactivity WHERE data_id= ?`;
  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error("Error deleting datainactivity:", err);
      res.status(500).json({ message: "Error deleting datainactivity" });
      return;
    }
    if (result.affectedRows > 0) {
      res.status(200).json({
        message: "DataInActivity deleted successfully",
      });
    } else {
      res.status(404).json({ message: "DataInActivity not found" });
    }
  });
});

router.put("/datainactivity", async (req, res) => {
  const { id, newData } = req.body;

  if (!newData) {
    return res.status(400).json({ message: "New data for update is missing" });
  }

  const query = `UPDATE datainactivity SET ? WHERE data_id = ?`;

  db.query(query, [newData, id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error updating datainactivity" });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Datainactivity not found" });
    } else {
      res.status(200).json({ message: "Datainactivity updated successfully" });
    }
  });
});

module.exports = router;
