//import { v4 as uuidv4 } from 'uuid';

import db from '../db/sqlite.mjs';

const Lure = {
  create: (typeOfLure, callback) => {
    const query = `INSERT INTO lure (typeOfLure) VALUES (?)`;
    db.run(query, [typeOfLure], function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID, typeOfLure });
      }
    });
  },
  findById: (id, callback) => {
    const query = `SELECT * FROM lure WHERE id = ?`;
    db.get(query, [id], (err, lure) => {
      callback(err, lure);
    });
  },
  update: (id, typeOfLure, callback) => {
    const query = `UPDATE lure SET typeOfLure = ? WHERE id = ?`;
    db.run(query, [typeOfLure, id], function (err) {
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
