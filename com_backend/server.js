const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ----------------- MySQL CONNECTION -----------------
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Pradeep@12",
  database: "community_db",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err.message);
    process.exit(1); // stop server if DB fails
  }
  console.log("✅ MySQL Connected!");
});

// ----------------- SIGNUP API -----------------
// ----------------- SIGNUP API -----------------
app.post("/signup", async (req, res) => {
  const data = req.body;

  try {
    // Check if username or email already exists
    const [existing] = await db
      .promise()
      .query("SELECT id FROM users WHERE username = ? OR email = ?", [
        data.username,
        data.email,
      ]);

    if (existing.length > 0) {
      return res.status(400).json({ error: "⚠️ Username or Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // ✅ Set status depending on role
    const status = data.role === "admin" ? "APPROVED" : "PENDING";

    const sql = `
      INSERT INTO users 
      (firstname, lastname, username, email, phone, password, role, door_no, street, apartment, family_details, family_members, communication, worker_type, work, seperate_work, time, terms, status) 
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    // ✅ Use status variable here
    await db.promise().query(sql, [
      data.firstname,
      data.lastname,
      data.username,
      data.email,
      data.phone,
      hashedPassword,
      data.role,
      data.door_no,
      data.street,
      data.apartment,
      data.family_details,
      data.family_members,
      data.communication,
      data.worker_type,
      data.work,
      data.seperate_work,
      data.time,
      data.terms,
      status, // <-- use this variable
    ]);

    res.status(201).json({
      message: "✅ User registered successfully",
    });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
});


// ----------------- LOGIN API -----------------
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [results] = await db
      .promise()
      .query("SELECT * FROM users WHERE username = ?", [username]);

    if (results.length === 0) {
      return res.status(401).json({ error: "❌ Invalid username or password" });
    }

    const user = results[0];

    // ✅ Only block approval for normal users
    if (user.role !== "admin" && user.status !== "APPROVED") {
      return res.status(403).json({ error: "⏳ Account pending admin approval" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "❌ Invalid username or password" });
    }

    res.json({
      message: "✅ Login successful",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});


// ----------------- ADMIN APIs -----------------

// Get all users (pending + approved)
app.get("/admin/users", async (req, res) => {
  try {
    const [results] = await db
      .promise()
      .query("SELECT id, firstname, lastname, username, email, role, status FROM users");

    res.json(results);
  } catch (err) {
    console.error("❌ Fetch Users Error:", err);
    res.status(500).send("DB error");
  }
});

// Approve user
app.put("/admin/approve/:id", async (req, res) => {
  try {
    await db.promise().query("UPDATE users SET status = 'APPROVED' WHERE id = ?", [req.params.id]);
    res.send("✅ User approved");
  } catch (err) {
    console.error("❌ Approve Error:", err);
    res.status(500).send("DB error");
  }
});

// Reject/remove user
app.delete("/admin/reject/:id", async (req, res) => {
  try {
    await db.promise().query("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.send("❌ User rejected/removed");
  } catch (err) {
    console.error("❌ Reject Error:", err);
    res.status(500).send("DB error");
  }
});

// ----------------- GET PENDING USERS (Admin only) -----------------
app.get("/pending-users", async (req, res) => {
  try {
    const [results] = await db
      .promise()
      .query(
        "SELECT id, firstname, lastname, username, email, role, status FROM users WHERE status = 'PENDING'"
      );

    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching pending users:", err);
    res.status(500).json({ error: "Server error while fetching pending users" });
  }
});

// ----------------- APPROVE USER -----------------
app.post("/approve-user", async (req, res) => {
  const { id } = req.body;

  try {
    await db
      .promise()
      .query("UPDATE users SET status = 'APPROVED' WHERE id = ?", [id]);

    res.json({ message: "✅ User approved successfully" });
  } catch (err) {
    console.error("❌ Approve Error:", err);
    res.status(500).json({ error: "Server error while approving user" });
  }
});

// ----------------- REJECT USER -----------------
app.post("/reject-user", async (req, res) => {
  const { id } = req.body;

  try {
    await db.promise().query("DELETE FROM users WHERE id = ?", [id]);

    res.json({ message: "❌ User rejected & deleted" });
  } catch (err) {
    console.error("❌ Reject Error:", err);
    res.status(500).json({ error: "Server error while rejecting user" });
  }
});

// ----------------- START SERVER -----------------
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
