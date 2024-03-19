const express = require("express");
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const checkQuery = `SELECT * FROM users WHERE username = ?`;

  db.query(checkQuery, [username], async (err, result) => {
    if (err) {
      console.error("Error checking username:", err);
      res.status(500).json({ error: "Error checking username" });
      return;
    }
    if (result.length > 0) {
      const user = result[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign({ user_id: user.user_id }, "your_secret_key", {
          expiresIn: "1hr",
        });
        res.status(200).json({ message: "Login successful", token });
        return;
      }
    }
    res.status(401).json({ message: "Invalid username or password" });
  });
});

router.get("/getuserfromtoken", async (req, res) => {
  const secretKey = "your_secret_key";
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: "Token is missing" });
    }
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.user_id;
    const userExp = decodedToken.exp;
    const query = `SELECT * FROM users WHERE user_id = ?`;
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ message: "Error retrieving user" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      const user = result[0];
      res.status(200).json({ user, userExp });
    });
  } catch (e) {
    res.status(500).json({ message: `Error retrieving user: ${e.message}` });
  }
});

router.get("/getuser", async (req, res) => {
  const { id } = req.query;
  const query = `SELECT * FROM users WHERE user_id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error retrieving user" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(result[0]);
    }
  });
});

router.get("/users", async (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error retrieving users" });
      return;
    }
    res.status(200).json(result);
  });
});

router.post("/register", async (req, res) => {
  const { username, password, user_email, user_firstname, user_lastname } =
    req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const checkQuery = `SELECT * FROM users WHERE username = ?`;

  db.query(checkQuery, [username], (err, result) => {
    if (err) {
      console.error("Error checking username:", err);
      res.status(500).json({ message: "Error checking username" });
      return;
    }

    if (result.length > 0) {
      console.log("Username already exists");
      res.status(400).json({ message: "Username already exists" });
      return;
    }

    const insertQuery = `INSERT INTO users (username, password, user_email, user_firstname, user_lastname) 
                         VALUES (?, ?, ?, ?, ?)`;

    db.query(
      insertQuery,
      [username, hashPassword, user_email, user_firstname, user_lastname],
      (err, result) => {
        if (err) {
          console.error("Error inserting user data:", err);
          res.status(500).json({ message: "Error inserting user data" });
          return;
        }

        console.log("User data inserted successfully");
        res.status(200).json({ message: "User data inserted successfully" });
      }
    );
  });
});

router.put("/user", async (req, res) => {
  const { id, newData } = req.body;

  if (!newData) {
    return res.status(400).json({ message: "New data for update is missing" });
  }

  const query = `UPDATE users SET ? WHERE user_id = ?`;
  db.query(query, [newData, id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ message: "Error retrieving user" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User update succesfully" });
    }
  });
});

module.exports = router;
