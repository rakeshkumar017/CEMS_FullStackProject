import dotenv from "dotenv";
import path from "path";
import pg from "pg";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const db = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }, // Neon requires SSL
});

export default db;
