import express from "express";
import db from "../config/db.js";

const router = express.Router();

export const registerEvent = async (req, res) => {
  try {
    const { eventId, email, name } = req.body;
    const existing = await db.query(
      "SELECT * FROM registrations WHERE event_id = $1 AND student_email = $2",
      [eventId, email]
    );
    if (existing.rows.length) return res.status(400).json({ msg: "Already registered" });

    const result = await db.query(
      "INSERT INTO registrations(event_id, student_email, student_name) VALUES($1, $2, $3) RETURNING *",
      [eventId, email, name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Register event error:", err);
    res.status(500).json({ msg: "Error registering event" });
  }
};

export const unregister = async (req, res) => {
  try {
    const { eventId, email } = req.body;
    await db.query("DELETE FROM registrations WHERE event_id = $1 AND student_email = $2", [
      eventId,
      email,
    ]);
    res.json({ msg: "Unregistered" });
  } catch {
    res.status(500).json({ msg: "Error unregistering" });
  }
};

export const getRegisteredEvents = async (req, res) => {
  try {
    const { email } = req.params;
    const result = await db.query(
      `SELECT e.* FROM events e
       JOIN registrations r ON e.id = r.event_id WHERE r.student_email = $1`,
      [email]
    );
    res.json(result.rows);
  } catch {
    res.status(500).json({ msg: "Error fetching registered events" });
  }
};

export const getRegistrationsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const result = await db.query(
      'SELECT student_name AS "studentName", student_email AS "studentEmail" FROM registrations WHERE event_id = $1',
      [eventId]
    );
    res.json(result.rows);
  } catch {
    res.status(500).json({ message: "Error fetching registrations" });
  }
};

// Attach routes directly
router.post("/", registerEvent);
router.post("/unregister", unregister);
router.get("/event/:eventId", getRegistrationsByEvent);
router.get("/:email", getRegisteredEvents);

export default router;
