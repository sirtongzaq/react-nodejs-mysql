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

router.get("/peronalsearch", async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: "Name parameter is missing" });
  }

  const query = `SELECT data_id, act_id, p_data_name, p_data_storage, p_data_name_access, p_data_approve_destroy, p_data_way_destroy FROM datainactivity WHERE p_data_name LIKE ?`;

  const parameterizedName = `%${name}%`;

  db.query(query, [parameterizedName], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the provided name" });
    }

    const responseDataArray = [];

    result.forEach((data) => {
      const act_id = data.act_id;
      const queryActivity = `SELECT act_name, dept_id FROM activitys WHERE act_id = ?`;

      db.query(queryActivity, [act_id], (errActivity, resultActivity) => {
        if (errActivity) {
          console.error("Error executing activity query:", errActivity);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        let activityDetails = {};
        if (resultActivity.length === 0) {
          activityDetails = {
            act_name: "No Data",
            dept_id: "No Data",
          };
        } else {
          activityDetails = {
            act_name: resultActivity[0].act_name,
            dept_id: resultActivity[0].dept_id,
          };
        }

        const dept_id = activityDetails.dept_id;
        const queryDepartment = `SELECT dept_id, dept_name FROM departments WHERE dept_id = ?`;

        db.query(
          queryDepartment,
          [dept_id],
          (errDepartment, resultDepartment) => {
            if (errDepartment) {
              console.error("Error executing department query:", errDepartment);
              return res.status(500).json({ message: "Internal Server Error" });
            }

            let departmentDetails;
            if (resultDepartment.length === 0) {
              departmentDetails = {
                dept_name: "No Data",
              };
            } else {
              departmentDetails = {
                dept_name: resultDepartment[0].dept_name,
              };
            }

            const responseData = {
              data_id: data.data_id,
              act_id: data.act_id,
              dept_id: activityDetails.dept_id,
              p_data_name: data.p_data_name,
              p_data_storage: data.p_data_storage,
              p_data_name_access: data.p_data_name_access,
              p_data_approve_destroy: data.p_data_approve_destroy,
              p_data_way_destroy: data.p_data_way_destroy,
              act_name: activityDetails.act_name,
              dept_name: departmentDetails.dept_name,
            };

            responseDataArray.push(responseData);

            if (responseDataArray.length === result.length) {
              res.status(200).json(responseDataArray);
            }
          }
        );
      });
    });
  });
});

router.get("/peronal", async (req, res) => {
  const query = `SELECT data_id, act_id, p_data_name, p_data_storage, p_data_name_access, p_data_approve_destroy, p_data_way_destroy FROM datainactivity`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the provided name" });
    }

    const responseDataArray = [];

    result.forEach((data) => {
      const act_id = data.act_id;
      const queryActivity = `SELECT act_name, dept_id FROM activitys WHERE act_id = ?`;

      db.query(queryActivity, [act_id], (errActivity, resultActivity) => {
        if (errActivity) {
          console.error("Error executing activity query:", errActivity);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        let activityDetails = {};
        if (resultActivity.length === 0) {
          activityDetails = {
            act_name: "No Data",
            dept_id: "No Data",
          };
        } else {
          activityDetails = {
            act_name: resultActivity[0].act_name,
            dept_id: resultActivity[0].dept_id,
          };
        }

        const dept_id = activityDetails.dept_id;
        const queryDepartment = `SELECT dept_id, dept_name FROM departments WHERE dept_id = ?`;

        db.query(
          queryDepartment,
          [dept_id],
          (errDepartment, resultDepartment) => {
            if (errDepartment) {
              console.error("Error executing department query:", errDepartment);
              return res.status(500).json({ message: "Internal Server Error" });
            }

            let departmentDetails;
            if (resultDepartment.length === 0) {
              departmentDetails = {
                dept_name: "No Data",
              };
            } else {
              departmentDetails = {
                dept_name: resultDepartment[0].dept_name,
              };
            }

            const responseData = {
              data_id: data.data_id,
              act_id: data.act_id,
              dept_id: activityDetails.dept_id,
              p_data_name: data.p_data_name,
              p_data_storage: data.p_data_storage,
              p_data_name_access: data.p_data_name_access,
              p_data_approve_destroy: data.p_data_approve_destroy,
              p_data_way_destroy: data.p_data_way_destroy,
              act_name: activityDetails.act_name,
              dept_name: departmentDetails.dept_name,
            };

            responseDataArray.push(responseData);

            if (responseDataArray.length === result.length) {
              res.status(200).json(responseDataArray);
            }
          }
        );
      });
    });
  });
});

module.exports = router;
