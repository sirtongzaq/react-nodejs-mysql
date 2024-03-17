const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  // database: "ropa",
  port: 3306,
});

module.exports = db;
