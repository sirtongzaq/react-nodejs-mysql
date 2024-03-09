const express = require("express");
const pool = require("./db");
const cors = require("cors");
const authRouter = require("./authservice");
const depRouter = require("./depservice");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5555;

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    console.log(`Database connection is fail`);
    return;
  }

  release();
  console.log(`Database connection is successful`);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

app.use("/auth", authRouter);
app.use("/dep", depRouter);

app.get("/setup", async (req, res) => {
  // create table users
  try {
    await pool.query('CREATE EXTENSION IF NOT EXISTS "postgres_fdw"');
    await pool.query(`
      CREATE SERVER db
      FOREIGN DATA WRAPPER postgres_fdw
      OPTIONS (host 'db', dbname 'postgres', port '5432');
    `);
    await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await pool.query(
      "CREATE TABLE Users (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, username TEXT, password TEXT)"
    );
    await pool.query(
      "CREATE TABLE Departments (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, dep_name TEXT)"
    );
    res.status(200).send({
      message: "DATABASE CREATE SERVER , DB AND TABLE",
    });
  } catch (e) {
    res.status(500).send({
      message: `Error: ${e}`,
    });
  }
});

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "users"');
    const users = result.rows;
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send({
      massage: `Error ${e}!`,
    });
  }
});
