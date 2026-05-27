import express from "express";
import db from "../config/db.js";

const router = express.Router();

export const createEvent = async (req, res) => {

  try {
    const { title, date, description, image, host_email } = req.body;
   
    const result = await db.query(
      `INSERT INTO events(title, date, description, image, host_email, is_approved)
       VALUES($1, $2, $3, $4, $5, false) RETURNING *`,
      [title, date, description, image, host_email]
    );

    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ msg: "Error creating event" });
  }
};

export const approveEvent = async (req, res) => {

  try {
    const { id } = req.params;
    const result = await db.query(
      "UPDATE events SET is_approved = true WHERE id = $1 RETURNING *",
      [id]
    );

    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ msg: "Error approving event" });
  }
};

export const getApprovedEvents = async (req, res) => {

  try {
    const result = await db.query("SELECT * FROM events WHERE is_approved = true");
    
    res.json(result.rows);
  } catch {
    res.status(500).json({ msg: "Error fetching approved events" });
  }
};

export const getUnapprovedEvents = async (req, res) => {
  
  try {
    const result = await db.query("SELECT * FROM events WHERE is_approved = false");
    res.json(result.rows);
  } catch {
    res.status(500).json({ msg: "Error fetching unapproved events" });
  }
};

export const getHostEvents = async (req, res) => {

  try {
    const { email } = req.params;

    const result = await db.query("SELECT * FROM events WHERE host_email = $1", [email]);
    res.json(result.rows);
  } catch {
    res.status(500).json({ msg: "Error fetching host events" });
  }
};

export const deleteEvent = async (req, res) => {

  try {
    const { id } = req.params;

    await db.query("DELETE FROM events WHERE id = $1", [id]);
    res.json({ msg: "Event deleted" });
  } catch {
    res.status(500).json({ msg: "Error deleting event" });
  }
};

// Attach routes directly
router.post("/", createEvent);
router.get("/approved", getApprovedEvents);
router.get("/unapproved", getUnapprovedEvents);
router.patch("/:id", approveEvent);
router.delete("/:id", deleteEvent);
router.get("/host/:email", getHostEvents);

export default router;
