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

const updateCar = ({ _id, brand, model, year, fuel, seats, imgUrl, price }) => {
  return new Promise((resolve, reject) => {});
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

const getCarList = () => {
  return new Promise((resolve, reject) => {
    try {
      CarSchema.find({}, (err, data) => {
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

module.exports = { insertCar, updateCar, findCarById, deleteCar, getCarList };
