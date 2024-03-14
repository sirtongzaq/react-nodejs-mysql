const express = require("express");
const db = require("./db");
const cors = require("cors");
const PORT = process.env.PORT || 5555;
const bodyParser = require("body-parser");
const authRouter = require("./authservice");
const depRouter = require("./deptservice");
const actRouter = require("./activityservice");
const dataInActRouter = require("./datainactivityservice");
const measRouter = require("./measuresservice");
const createTables = require("./schema");
const app = express();
app.use(bodyParser.json());
app.use(cors());

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    console.log(`Database connection is fail`);
    return;
  }
  console.log(`Database connection is successful`);

  db.query(createTables.createUsersTable(), (err) => {
    if (err) {
      console.error("Error creating users table:", err.message);
    } else {
      console.log("Users table created successfully");
    }
  });

  db.query(createTables.createDepartmentsTable(), (err) => {
    if (err) {
      console.error("Error creating departments table:", err.message);
    } else {
      console.log("Departments table created successfully");
    }
  });

  db.query(createTables.createActivitysTable(), (err) => {
    if (err) {
      console.error("Error creating activitys table:", err.message);
    } else {
      console.log("Activitys table created successfully");
    }
  });

  db.query(createTables.createDataInActivityTable(), (err) => {
    if (err) {
      console.error("Error creating datainactivity table:", err.message);
    } else {
      console.log("Datainactivity table created successfully");
    }
  });

  db.query(createTables.createMeasuresTable(), (err) => {
    if (err) {
      console.error("Error creating measures table:", err.message);
    } else {
      console.log("Measures table created successfully");
    }
  });

  // Register routes after establishing database connection
  app.use("/auth", authRouter);
  app.use("/dept", depRouter);
  app.use("/act", actRouter);
  app.use("/datainact", dataInActRouter);
  app.use("/meas", measRouter);
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

app.get("/", (req, res) => {
  res.sendStatus(200);
});
