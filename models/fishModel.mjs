import db from '../db/sqlite.mjs';

const Fish = {
  create: (typeOfFish, size, weight, lure_id, fishImagePath, callback) => {
    const query = `INSERT INTO fish (typeOfFish, size, weight, lure_id, fishImagePath) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [typeOfFish, size, weight, lure_id, fishImagePath], function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID, typeOfFish, size, weight, lure_id, fishImagePath})
      }
    });
  },
  findById: (id, callback) => {
    const query = `SELECT * FROM fish WHERE id = ?`;
    db.get(query, [id], (err, fish) => {
      callback(err, fish);
    });
  },
  getAll: (callback) => {
    const query = `SELECT * FROM fish`;
    db.all(query, [], (err, fish) => {
      callback(err, fish);
    });
  },
  update: (id, typeOfFish, size, weight, lure_id, fishImagePath, callback) => {
    const query = `UPDATE fish SET typeOfFish = ?, fishImagePath = ? WHERE id = ?`;
    db.run(query, [typeOfLure, lureImagePath, id], function (err) {
      if (err) {
        callback(err);
      } else {
        Lure.findById(id, callback);
      }
    });
  },

  delete: (id, callback) => {
    const query = `DELETE FROM fish WHERE id = ?`;
    db.run(query, [id], (err) => {
      callback(err);
    });
  }
};

export default Fish;