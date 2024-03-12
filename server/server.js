const express = require("express");
const db = require("./db");
const cors = require("cors");
const PORT = process.env.PORT || 5555;
const bodyParser = require("body-parser");
const authRouter = require("./authservice");
const depRouter = require("./deptservice");
const actRouter = require("./activityservice");

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
  // Register routes after establishing database connection
  app.use("/auth", authRouter);
  app.use("/dept", depRouter);
  app.use("/act", actRouter);

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

app.get("/", (req, res) => {
  res.sendStatus(200);
});
