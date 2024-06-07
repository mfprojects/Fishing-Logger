import { v4 as uuidv4 } from 'uuid';

const lures = [];

const Lure = {
  create: (typeOfLure, callback) => {
    const newLure = { id: uuidv4(), typeOfLure };
    lures.push(newLure);
    callback(null, newLure);
  },
  findById: (id, callback) => {
    const lure = lures.find(l => l.id === id);
    callback(null, lure);
  },
  update: (id, typeOfLure, callback) => {
    const index = lures.findIndex(l => l.id === id);
    if (index !== -1) {
      lures[index].typeOfLure = typeOfLure;
      callback(null, lures[index]);
    } else {
      callback(new Error('Lure not found'));
    }
  },
  delete: (id, callback) => {
    const index = lures.findIndex(l => l.id === id);
    if (index !== -1) {
      lures.splice(index, 1);
      callback(null);
    } else {
      callback(new Error('Lure not found'));
    }
  }
};

export default Lure;