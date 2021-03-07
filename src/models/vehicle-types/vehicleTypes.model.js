const { vehicleTypeSchema } = require('./vehicleTypes.schema');

const insertCarType = (car) => {
  return new Promise(async (resolve, reject) => {
    try {
      const vehicleType = car.vehicleType.toLowerCase();

      let vehicleTypeId;
      // see if there is vehicleType colection, if there is take id and store in vehicleTypeId
      await vehicleTypeSchema
        .find({})
        .then((data) => (data[0] ? (vehicleTypeId = data[0]._id) : null))
        .catch((err) => console.log(err));

      // if there is no colection and documents then create new collection and save id in vehicleTypeId
      if (!vehicleTypeId) {
        await vehicleTypeSchema({
          economy: [],
          estate: [],
          luxury: [],
          suv: [],
          cargo: [],
        })
          .save()
          .then((data) => (vehicleTypeId = data._id))
          .catch((error) => reject(error));
      }
      // find vehicleType and update array with this created cars
      vehicleTypeSchema.findOneAndUpdate(
        { _id: vehicleTypeId },
        { $push: { [vehicleType]: { _id: car._id } } },
        { new: true },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

const deleteCarType = (id, vehicleType) => {
  return new Promise((resolve, reject) => {
    try {
      vehicleTypeSchema.findOneAndUpdate(
        { _id: '6043a4825491e028dc69f949' },
        { $pull: { suv: '6043a5e76ea0b63e4816097f' } }
      ),
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        };
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  insertCarType,
  deleteCarType,
};
