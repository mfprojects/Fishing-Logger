//import { v4 as uuidv4 } from 'uuid';

import db from '../db/sqlite.mjs';

const Lure = {
  create: (typeOfLure, lureImagePath, callback) => {
    const query = `INSERT INTO lure (typeOfLure, lureImagePath) VALUES (?, ?)`;
    db.run(query, [typeOfLure, lureImagePath], function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID, typeOfLure, lureImagePath });
      }
    });
  },
  findById: (id, callback) => {
    const query = `SELECT * FROM lure WHERE id = ?`;
    db.get(query, [id], (err, lure) => {
      callback(err, lure);
    });
  },
  getAll: (callback) => {
    const query = `SELECT * FROM lure`;
    db.all(query, [], (err, lures) => {
      callback(err, lures);
    });
  },
  update: (id, typeOfLure, lureImagePath, callback) => {
    const query = `UPDATE lure SET typeOfLure = ?, lureImagePath = ? WHERE id = ?`;
    db.run(query, [typeOfLure, lureImagePath, id], function (err) {
      if (err) {
        callback(err);
      } else {
        Lure.findById(id, callback);
      }
    });
  },
  delete: (id, callback) => {
    const query = `DELETE FROM lure WHERE id = ?`;
    db.run(query, [id], (err) => {
      callback(err);
    });
  }
};

export default Lure;
