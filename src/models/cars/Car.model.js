const { CarSchema } = require('./Car.schema');

const findCarById = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      CarSchema.findById(_id)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

const insertCar = (carObj) => {
  return new Promise((resolve, reject) => {
    try {
      CarSchema(carObj)
        .save()
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

const deleteCar = (_id) => {
  return new Promise((resolve, reject) => {
    if (!_id) return false;
    try {
      CarSchema.findByIdAndDelete(_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const isRented = (_id) => {
  return new Promise((resolve, reject) => {
    if (!_id) return false;
    try {
      CarSchema.findByIdAndUpdate(_id, { isRented: true }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const isReturned = (_id) => {
  return new Promise((resolve, reject) => {
    if (!_id) return false;
    try {
      CarSchema.findByIdAndUpdate(_id, { isRented: false }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getCarList = () => {
  return new Promise((resolve, reject) => {
    try {
      CarSchema.find({}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }).sort({ isRented: 1 });
    } catch (error) {
      reject(error);
    }
  });
};

const getClientsRentedCars = (rentals) => {
  return new Promise((resolve, reject) => {
    try {
      CarSchema.find({ _id: { $in: rentals } })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

const numOfAvailableMinus = (model) => {
  return new Promise((resolve, reject) => {
    try {
      CarSchema.updateMany({ model }, { $inc: { availableNum: -1 } })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  insertCar,
  findCarById,
  deleteCar,
  getCarList,
  isRented,
  isReturned,
  getClientsRentedCars,
  numOfAvailableMinus,
};
