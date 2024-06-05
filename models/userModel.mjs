import db from '../db/sqlite.mjs';

class User {
  static create(name, email, password, callback) {
    db.run(
      `INSERT INTO user (name, email, password) VALUES (?, ?, ?)`,
      [name, email, password],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, { id: this.lastID, name, email, password });
      }
    );
  }

  static findById(id, callback) {
    db.get(`SELECT * FROM user WHERE id = ?`, [id], (err, row) => {
      if (err) {
        return callback(err);
      }
      callback(null, row);
    });
  }

  // Additional CRUD methods as needed
}

export default User;