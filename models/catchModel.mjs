import db from '../db/sqlite.mjs';

const CatchRecord = {
  create: (fish_id, size, weight, lure_id, catchDateTime, fishImagePath, callback) => {
    const query = `INSERT INTO catch (fish_id, size, weight, lure_id, catchDateTime, fishImagePath) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [fish_id, size, weight, lure_id, catchDateTime, fishImagePath], function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID, fish_id, size, weight, lure_id, catchDateTime, fishImagePath });
      }
    });
  },
  findById: (id, callback) => {
    const query = `SELECT catch.*, lure.typeOfLure FROM catch JOIN lure ON catch.lure_id = lure.id WHERE catch.id = ?`;
    db.get(query, [id], (err, catchRecord) => {
      callback(err, catchRecord);
    });
  },
  getAll: (callback) => {
    const query = `SELECT catch.*, lure.typeOfLure, fish.typeOfFish
    FROM catch
    JOIN lure ON catch.lure_id = lure.id
    JOIN fish ON catch.fish_id = fish.id`;
    db.all(query, [], (err, catchRecords) => {
      callback(err, catchRecords);
    });
  },
  update: (id, fish_id, size, weight, lure_id, fishImagePath, callback) => {
    const query = `UPDATE catch SET fish_id = ?, size = ?, weight = ?, lure_id = ?, fishImagePath = ? WHERE id = ?`;
    db.run(query, [fish_id, size, weight, lure_id, fishImagePath, id], function (err) {
      if (err) {
        callback(err);
      } else {
        CatchRecord.findById(id, callback);
      }
    });
  },
  delete: (id, callback) => {
    const query = `DELETE FROM catch WHERE id = ?`;
    db.run(query, [id], (err) => {
      callback(err);
    });
  }
};

export default CatchRecord;
