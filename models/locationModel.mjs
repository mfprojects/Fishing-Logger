import db from '../db/sqlite.mjs';

const Location = {
  create: (latitude, longitude, locationName, callback) => {
    const query = `INSERT INTO location (latitude, longitude, locationName) VALUES (?, ?, ?)`;
    db.run(query, [latitude, longitude], function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID, latitude, longitude, locationName });
      }
    });
  },

  findById: (id, callback) => {
    const query = `SELECT * FROM location WHERE id = ?`;
    db.get(query, [id], (err, location) => {
      callback(err, location);
    });
  },

  findByCoordinates: (latitude, longitude, callback) => {
    const query = `SELECT * FROM location WHERE latitude = ? AND longitude = ?`;
    db.get(query, [latitude, longitude], (err, location) => {
      callback(err, location);
    });
  },

  getAll: (callback) => {
    const query = `SELECT * FROM location`;
    db.all(query, [], (err, locations) => {
      callback(err, locations);
    });
  },

  update: (id, latitude, longitude, callback) => {
    const query = `UPDATE location SET latitude = ?, longitude = ? WHERE id = ?`;
    db.run(query, [latitude, longitude, id], function (err) {
      if (err) {
        callback(err);
      } else {
        Location.findById(id, callback);
      }
    });
  },

  delete: (id, callback) => {
    const query = `DELETE FROM location WHERE id = ?`;
    db.run(query, [id], (err) => {
      callback(err);
    });
  }
};

export default Location;
