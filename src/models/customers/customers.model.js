const { customerSchema } = require('./customers.schema');

const insertCustomer = (customer) => {
  return new Promise((resolve, reject) => {
    try {
      customerSchema(customer)
        .save()
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

const findCustomerByEmail = (email) => {
  return new Promise((resolve, reject) => {
    try {
      customerSchema
        .findOne({ email })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

const findCustomerById = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      customerSchema
        .findOne({ _id })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

const deleteCustumerById = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      customerSchema
        .findByIdAndDelete({ _id })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

const getCustomers = () => {
  return new Promise((resolve, reject) => {
    try {
      customerSchema
        .find({}, { isVip: 0, createdAt: 0, updatedAt: 0, rentals: 0, __v: 0 })
        .sort({ createdAt: -1 })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

const addToRentals = (_id, carId) => {
  return new Promise((resolve, reject) => {
    try {
      customerSchema
        .findByIdAndUpdate({ _id }, { $push: { rentals: { _id: carId } } })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

const removeFromRentals = (_id, carId) => {
  return new Promise((resolve, reject) => {
    try {
      customerSchema
        .findByIdAndUpdate({ _id }, { $pull: { rentals: { _id: carId } } })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  insertCustomer,
  findCustomerByEmail,
  getCustomers,
  findCustomerById,
  deleteCustumerById,
  addToRentals,
  removeFromRentals,
};
