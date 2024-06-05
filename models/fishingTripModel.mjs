import db from '../db/sqlite.mjs';

class FishingTrip {
  static create(user_id, date, location, weather, callback) {
    db.run(
      `INSERT INTO fishingTrip (user_id, date, location, weather) VALUES (?, ?, ?, ?)`,
      [user_id, date, location, weather],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, { id: this.lastID,user_id, date, location, weather });
      }
    );
  }

  static findById(id, callback) {
    db.get(`SELECT * FROM user WHERE id = ?`, [id], (err, row) => {
      if (err) {
        return callback(err);
      }
      callback(null, row);
    });
  }

  // Additional CRUD methods as needed
}

export default User;