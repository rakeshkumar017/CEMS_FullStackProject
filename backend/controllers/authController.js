import express from "express";
import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/auth.js";
import { roleMiddleware } from "../middleware/role.js";

const router = express.Router();

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, hashedPassword, role]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") return res.status(409).json({ msg: "Email already exists" });
    res.status(500).json({ msg: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (!result.rows.length) return res.status(404).json({ message: "User not found" });
    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        roll_number: user.roll_number,
      },
      token,
    });
    
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching users" });
  }
};

export const updateUser = async (req, res) => {
  const { email } = req.params;
  const { department, roll_number } = req.body;

  try {
    const result = await db.query(
      "UPDATE users SET department = $1, roll_number = $2 WHERE email = $3 RETURNING *",
      [department, roll_number, email]
    );
    if (!result.rows.length) return res.status(404).json({ msg: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ---------- Public routes ----------
router.post("/register", register);
router.post("/login", login);

// ---------- Protected routes ----------
router.get("/users", authMiddleware, roleMiddleware(["admin", "host", "student"]), getAllUsers);
router.put("/users/:email", authMiddleware, roleMiddleware(["admin", "host", "student"]), updateUser);

export default router;
