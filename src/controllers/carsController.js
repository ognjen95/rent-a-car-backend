const {
  insertCar,
  getCarList,
  deleteCar,
  findCarById,
} = require('../models/cars/Car.model');

// @ create car controller
// @router POST /api/cars/create-new-car
// @access Public

const createNewCarController = async (req, res) => {
  const newCarData = req.body;

  try {
    const result = await insertCar(newCarData);
    return res.json({ message: 'New car created', result });
  } catch (error) {
    console.log('error');
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

    result = await insertCar(car);

    return res.json({ message: 'Car updated successfuly', result });
  } catch (error) {
    console.log('error');
    res.json({ status: 'error', message: error.message });
  }
};

const deleteCarController = async (req, res) => {
  const carId = req.params.id;
  const car = await findCarById(carId);
  try {
    if (car) {
      deleteCar(carId);
    }
    res.json({ message: 'Car deleted successfuly' });
  } catch (error) {
    console.log('error');
    res.json({ status: 'error', message: error.message });
  }
};

const getCarListController = async (req, res) => {
  try {
    result = await getCarList();
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
};
