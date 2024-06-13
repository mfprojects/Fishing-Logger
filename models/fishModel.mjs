//import { v4 as uuidv4 } from 'uuid';

import db from '../db/sqlite.mjs';

const Fish = {
  create: (typeOfFish, callback) => {
    const query = `INSERT INTO fish (typeOfFish) VALUES (?)`;
    db.run(query, [typeOfFish], function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID, typeOfFish });
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
  update: (id, typeOfFish, callback) => {
    const query = `UPDATE fish SET typeOfFish = ? WHERE id = ?`;
    db.run(query, [typeOfFish, id], function (err) {
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
