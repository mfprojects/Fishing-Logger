import db from '../db/sqlite.mjs';

class Fish {
  static create(trip_id, typeOfFish, size, weight, lure_id, callback) {
    db.run(
      `INSERT INTO fish (trip_id, typeOfFish, size, weight, lure_id) VALUES (?, ?, ?, ? , ?)`,
      [type],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, { id: this.lastID, trip_id, typeOfFish, size, weight, lure_id });
      }
    );
  }

  static findById(id, callback) {
    db.get(`SELECT * FROM fish WHERE id = ?`, [id], (err, row) => {
      if (err) {
        return callback(err);
      }
      callback(null, row);
    });
  }

  static update(id, trip_id, typeOfFish, size, weight, lure_id, callback) {
    db.run(
      `UPDATE fish SET trip_id = ?, type = ?, size = ?, weight = ?, lure_id = ? WHERE id = ?`,
      [trip_id, typeOfFish, size, weight, lure_id, id],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, { id, trip_id, typeOfFish, size, weight, lure_id });
      }
    );
  }

  static delete(id, callback) {
    db.run(`DELETE FROM fish WHERE id = ?`, [id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  }
  // Additional CRUD methods as needed
}

export default Fish;