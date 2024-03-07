const { Pool } = require("pg");

const pool = new Pool({
  //docker build
  host: "db", 
  //local build
  // host: "localhost", 
  port: 5432,
  user: "postgres",
  password: "admin",
  database: "testDB",
});

module.exports = pool