const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

/* =========================
   Database Connection Test
========================= */

pool.connect()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ Database connection failed:", err));

/* =========================
   Auto Table Creation
========================= */

async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email
      ON users(email);
    `);

    console.log("✅ Users table ready");
  } catch (err) {
    console.error("❌ Database initialization failed:", err);
    console.log("Retrying in 5 seconds...");
    setTimeout(initDB, 5000);
  }
}

initDB();

/* =========================
   Routes
========================= */

app.get("/", (req, res) => {
  res.send("Backend API is Running 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/* GET Users */

app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id DESC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("GET USERS ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

/* ADD User */

app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and Email are required"
    });
  }

  try {
    await pool.query(
      "INSERT INTO users(name,email) VALUES($1,$2)",
      [name, email]
    );

    res.status(201).json({
      success: true,
      message: "User added successfully"
    });
  } catch (err) {
    console.error("ADD USER ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

/* DELETE User */

app.delete("/api/users/:id", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM users WHERE id=$1",
      [req.params.id]
    );

    res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (err) {
    console.error("DELETE USER ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

/* =========================
   Start Server
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});