const {
  insertCar,
  getCarList,
  deleteCar,
  findCarById,
  numOfAvailablePlus,
  numOfAvailableMinus,
  isReturned,
} = require('../models/cars/Car.model');
const { insertCarType } = require('../models/vehicle-types/vehicleTypes.model');
// @ create car controller
// @router POST /api/cars/create-new-car
// @access Public

const createNewCarController = async (req, res) => {
  const newCarData = req.body;

  try {
    if (!newCarData)
      return res.json({
        status: 'error',
        message: 'Can not create new car now, try again later',
      });
    const result = await insertCar(newCarData);
    numOfAvailablePlus(newCarData.model);
    let typeResult;
    if (result) {
      typeResult = await insertCarType(result);
    }

    return res.json({ message: 'New car created', result, typeResult });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', message: error.message });
  }
};
// @ update car controller
// @router PUT /api/cars/edit-car/:id
// @access Public

const editCarController = async (req, res) => {
  const { brand, model, year, fuel, seats, imgUrl, price } = req.body;
  try {
    const carId = req.params.id;
    const car = await findCarById(carId);

    if (car) {
      car.brand = brand;
      car.model = model;
      car.year = year;
      car.fuel = fuel;
      car.seats = seats;
      car.imgUrl = imgUrl;
      car.price = price;
    }

    const result = await insertCar(car);

    return res.json({ message: 'Car updated successfuly', result });
  } catch (error) {
    console.log('error');
    res.json({ status: 'error', message: error.message });
  }
};

// @ update car is returned controller
// @router PATCH /api/cars/return-car/:id
// @access Public

const carReturnedController = async (req, res) => {
  const { id } = req.body;
  try {
    const carId = id;
    console.log(carId);
    const result = await isReturned(carId);
    console.log(result);
    return res.json({ message: 'Car returned successfuly', result });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', message: error.message });
  }
};
// @delete car controller
// @router DELETE /api/cars/delete-car/:id
// @access Public
const deleteCarController = async (req, res) => {
  const carId = req.params.id;
  const car = await findCarById(carId);
  try {
    if (carId) {
      // result = await deleteCarType(carId);
      numOfAvailableMinus(car.model);
      deleteCar(carId);
    }
    res.json({ message: 'Car deleted successfuly' });
  } catch (error) {
    console.log('error');
    res.json({ status: 'error', message: error.message });
  }
};
// @get car list controller
// @router GET /api/cars/
// @access Public
const getCarListController = async (req, res) => {
  try {
    const result = await getCarList();
    res.status(200).json({ result });
  } catch (error) {
    console.log('error');
    res.json({ status: 'error', message: error.message });
  }
};

// @get car  controller
// @router GET /api/cars/car/:id
// @access Public
const getCarController = async (req, res) => {
  try {
    const carId = req.params.id;
    const result = await findCarById(carId);
    res.status(200).json({ result });
  } catch (error) {
    console.log('error');
    res.json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createNewCarController,
  editCarController,
  deleteCarController,
  getCarListController,
  getCarController,
  carReturnedController,
};
