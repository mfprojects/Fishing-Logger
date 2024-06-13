import db from '../db/sqlite.mjs';

const CatchRecord = {
  create: (typeOfFish, size, weight, lure_id, catchDateTime, fishImagePath, callback) => {
    const query = `INSERT INTO catch (typeOfFish, size, weight, lure_id, catchDateTime, fishImagePath) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [typeOfFish, size, weight, lure_id, catchDateTime, fishImagePath], function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID, typeOfFish, size, weight, lure_id, catchDateTime, fishImagePath });
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
    const query = `SELECT catch.*, lure.typeOfLure FROM catch JOIN lure ON catch.lure_id = lure.id`;
    db.all(query, [], (err, catchRecords) => {
      callback(err, catchRecords);
    });
  },
  update: (id, typeOfFish, size, weight, lure_id, fishImagePath, callback) => {
    const query = `UPDATE catch SET typeOfFish = ?, size = ?, weight = ?, lure_id = ?, fishImagePath = ? WHERE id = ?`;
    db.run(query, [typeOfFish, size, weight, lure_id, fishImagePath, id], function (err) {
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
