import db from '../db/sqlite.mjs';

const Fish = {
  create: (typeOfFish, size, weight, lure_id, fishImagePath, callback) => {
    const query = `INSERT INTO fish (typeOfFish, size, weight, lure_id, fishImagePath) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [typeOfFish, size, weight, lure_id, fishImagePath], function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID, typeOfFish, size, weight, lure_id, fishImagePath })
      }
    });
  },
  findById: (id, callback) => {
    const query = `SELECT fish.*, lure.typeOfLure FROM fish JOIN lure ON fish.lure_id = lure.id WHERE fish.id = ?`;
    db.get(query, [id], (err, fish) => {
      callback(err, fish);
    });
  },
  getAll: (callback) => {
    const query = `SELECT fish.*, lure.typeOfLure FROM fish JOIN lure ON fish.lure_id = lure.id`;
    db.all(query, [], (err, fish) => {
      callback(err, fish);
    });
  },
  update: (id, typeOfFish, size, weight, lure_id, fishImagePath, callback) => {
    const query = `UPDATE fish SET typeOfFish = ?, size = ?, weight = ?, lure_id = ?, fishImagePath = ? WHERE id = ?`;
    db.run(query, [typeOfFish, size, weight, lure_id, fishImagePath, id], function (err) {
      if (err) {
        callback(err);
      } else {
        Fish.findById(id, callback);
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
