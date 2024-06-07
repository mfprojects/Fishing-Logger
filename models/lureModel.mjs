import db from '../db/sqlite.mjs';

class Lure {
  static create(typeOfLure, callback) {
    db.run(
      `INSERT INTO lure (typeOfLure) VALUES (?)`,
      [typeOfLure],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, { id: this.lastID, typeOfLure });
      }
    );
  }

  static findById(id, callback) {
    db.get(`SELECT * FROM lure WHERE id = ?`, [id], (err, row) => {
      if (err) {
        return callback(err);
      }
      callback(null, row);
    });
  }

  // Additional CRUD methods as needed
}

export default Lure;