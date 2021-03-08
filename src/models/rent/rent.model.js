const { rentSchema } = require('./rent.schema');

const insertOrder = (rentOrder) => {
  return new Promise((resolve, reject) => {
    try {
      rentSchema(rentOrder)
        .save()
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

const findOrderOfCustomer = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      rentSchema
        .find({ customer: _id })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  insertOrder,
  findOrderOfCustomer,
};
