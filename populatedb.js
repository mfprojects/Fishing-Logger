import sqlite3 from 'sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to the existing database
const db = new sqlite3.Database(join(__dirname, 'db/my-database.db'), (err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Connected to the SQLite database');

    // Check if the fish table exists
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='fish';", (err, table) => {
      if (err) {
        console.error('Error checking for fish table:', err);
      } else if (table) {
        console.log('Fish table exists');

        // Insert common fish types into the fish table
        const fishTypes = [
          'Atlantic Cod',
          'Atlantic Salmon',
          'Haddock',
          'Pollock',
          'Mackerel',
          'Herring',
          'Halibut',
          'Arctic Char',
          'Perch',
          'Pike'
        ];

        db.serialize(() => {
          const stmt = db.prepare(`INSERT INTO fish (typeOfFish) VALUES (?)`);

          fishTypes.forEach((fish) => {
            stmt.run(fish, (err) => {
              if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                  console.log(`Fish ${fish} already exists in the fish table`);
                } else {
                  console.error(`Failed to insert ${fish}:`, err);
                }
              } else {
                console.log(`Inserted ${fish} into the fish table`);
              }
            });
          });

          stmt.finalize((err) => {
            if (err) {
              console.error('Error finalizing statement:', err);
            }
            db.close((err) => {
              if (err) {
                console.error('Error closing database:', err);
              } else {
                console.log('Database connection closed');
              }
            });
          });
        });
      } else {
        console.error('Fish table does not exist');
        db.close((err) => {
          if (err) {
            console.error('Error closing database:', err);
          } else {
            console.log('Database connection closed');
          }
        });
      }
    });
  }
});
