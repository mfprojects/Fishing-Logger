import sqlite3 from 'sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to the database (or create it if it doesn't exist)
const db = new sqlite3.Database(join(__dirname, 'my-database.db'), (err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Connected to the SQLite database');
    // Create tables if they don't exist
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS fishing_trip (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        date DATE,
        location TEXT,
        weather TEXT,
        FOREIGN KEY(user_id) REFERENCES user(id)
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS fish (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        trip_id INTEGER,
        typeOfFish TEXT,
        size REAL,
        weight REAL,
        lure_id INTEGER,
        date DATE,
        fishImagePath TEXT,
        FOREIGN KEY(trip_id) REFERENCES fishing_trip(id),
        FOREIGN KEY(lure_id) REFERENCES lure(id)
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS lure (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        typeOfLure TEXT,
        lureImagePath TEXT
      )`);
    });
  }
});

export default db;
