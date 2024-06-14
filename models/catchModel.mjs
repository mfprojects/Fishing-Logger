import db from '../db/sqlite.mjs';

const CatchRecord = {
  create: (fish_id, size, weight, lure_id, catchDateTime, locationName, latitude, longitude, fishImagePath, callback) => {
    // Insert the location first
    const locationQuery = `INSERT INTO location (latitude, longitude, locationName) VALUES (?, ?, ?)`;
    db.run(locationQuery, [latitude, longitude, locationName], function (err) {
      if (err) {
        if (typeof callback === 'function') {
          callback(err);
        }
      } else {
        const location_id = this.lastID;
        // Insert the catch record with the new location_id
        const catchQuery = `INSERT INTO catch (fish_id, size, weight, lure_id, catchDateTime, location_id, fishImagePath) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.run(catchQuery, [fish_id, size, weight, lure_id, catchDateTime, location_id, fishImagePath], function (err) {
          if (typeof callback === 'function') {
            if (err) {
              callback(err);
            } else {
              callback(null, { id: this.lastID, fish_id, size, weight, lure_id, catchDateTime, location_id, fishImagePath });
            }
          } else {
            console.error('Callback is not a function');
          }
        });
      }
    });
  },
  
  findById: (id, callback) => {
    const query = `
      SELECT catch.*, lure.typeOfLure, location.locationName 
      FROM catch 
      JOIN lure ON catch.lure_id = lure.id 
      JOIN location ON catch.location_id = location.id 
      WHERE catch.id = ?`;
      
    db.get(query, [id], (err, catchRecord) => {
      if (typeof callback === 'function') {
        callback(err, catchRecord);
      } else {
        console.error('Callback is not a function');
      }
    });
  },
  
  getAll: (callback) => {
    const query = `
      SELECT catch.*, lure.typeOfLure, fish.typeOfFish, location.locationName
      FROM catch
      JOIN lure ON catch.lure_id = lure.id
      JOIN fish ON catch.fish_id = fish.id
      JOIN location ON catch.location_id = location.id`;
      
    db.all(query, [], (err, catchRecords) => {
      if (typeof callback === 'function') {
        callback(err, catchRecords);
      } else {
        console.error('Callback is not a function');
      }
    });
  },
  
  update: (id, fish_id, size, weight, lure_id, fishImagePath, callback) => {
    const query = `UPDATE catch SET fish_id = ?, size = ?, weight = ?, lure_id = ?, fishImagePath = ? WHERE id = ?`;
    db.run(query, [fish_id, size, weight, lure_id, fishImagePath, id], function (err) {
      if (typeof callback === 'function') {
        if (err) {
          callback(err);
        } else {
          CatchRecord.findById(id, callback);
        }
      } else {
        console.error('Callback is not a function');
      }
    });
  },
  
  delete: (id, callback) => {
    const query = `DELETE FROM catch WHERE id = ?`;
    db.run(query, [id], (err) => {
      if (typeof callback === 'function') {
        callback(err);
      } else {
        console.error('Callback is not a function');
      }
    });
  }
};

export default CatchRecord;
