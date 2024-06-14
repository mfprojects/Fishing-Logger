//TODO:
/*
Indeksere databasen?
*/
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
      
      db.run(`CREATE TABLE IF NOT EXISTS weather (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        temperature REAL,
        condition TEXT
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS location (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        latitude DECIMAL(9, 6) NOT NULL,
        longitude DECIMAL(9, 6) NOT NULL,
        locationName TEXT
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS fish (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        typeOfFish TEXT
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS catch (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fish_id INTEGER NOT NULL,
        size REAL,
        weight REAL,
        lure_id INTEGER,
        catchDateTime TEXT,
        fishImagePath TEXT,
        weather_id INTEGER,
        location_id INTEGER,
        FOREIGN KEY(fish_id) REFERENCES fish(id),
        FOREIGN KEY(lure_id) REFERENCES lure(id),
        FOREIGN KEY(weather_id) REFERENCES weather(id),
        FOREIGN KEY(location_id) REFERENCES location(id)
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
