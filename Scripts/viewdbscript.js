import sqlite3 from 'sqlite3';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new sqlite3.Database(join(__dirname, 'my-database.db'), (err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Connected to the SQLite database');
  }
});

db.all('SELECT * FROM lure', [], (err, rows) => {
  if (err) {
    throw err;
  }
  console.log(rows);
});

db.close();