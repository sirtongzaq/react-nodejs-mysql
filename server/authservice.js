const express = require("express");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query(
      'SELECT * FROM "users" WHERE "username" = $1',
      [username]
    );
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign(
          { userId: user.id, username: user.username },
          "your_secret_key",
          { expiresIn: "1hr" }
        );
        res.setHeader("Authorization", `Bearer ${token}`);
        res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (e) {
    res.status(500).send({
      massage: `Error ${e}!`,
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'SELECT * FROM "users" WHERE "username" = $1',
      [username]
    );
    if (result.rows.length > 0) {
      res.status(401).send({ message: "Username is already taken" });
    } else {
      await pool.query(
        'INSERT INTO "users" (username, password) VALUES ($1, $2)',
        [username, hashPassword]
      );
      res.status(200).send({
        message: `User regsiter succesfully! ${username} ${hashPassword}`,
      });
    }
  } catch (e) {
    res.status(500).send({
      massage: `Error ${e}!`,
    });
  }
});

router.get("/user", async (req, res) => {
  try {
    const { id } = req.query;
    const result = await pool.query('SELECT * FROM "users" WHERE id = $1', [
      id,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.status(200).send(user);
    } else {
      res.status(404).send({
        message: `User with ID ${id} not found`,
      });
    }
  } catch (e) {
    res.status(500).send({
      message: `User not found`,
    });
  }
});

router.get("/getuserfromtoken", async (req, res) => {
  const secretKey = "your_secret_key";
  try {
    const { token } = req.query;
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;
    const userExp = decodedToken.exp;
    const result = await pool.query('SELECT * FROM "users" WHERE id = $1', [
      userId,
    ]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.status(200).send({ user, userExp });
    } else {
      res.status(404).send({
        message: `User with ID ${userId} not found`,
      });
    }
  } catch (e) {
    // Handle token verification errors
    res.status(500).send({
      message: `Error retrieving user: ${e.message}`,
    });
  }
});

module.exports = router;
