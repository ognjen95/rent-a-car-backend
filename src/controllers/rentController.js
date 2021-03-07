const { findCarById, isRented } = require('../models/cars/Car.model');
const {
  findCustomerByEmail,
  insertCustomer,
  addToRentals,
} = require('../models/customers/customers.model');

const { daysBetween } = require('../helpers/daysBetween');
const { insertOrder } = require('../models/rent/rent.model');
//rent a car functionality

const rentACarController = async (req, res) => {
  const { name, lastName, email, phone, startDate, endDate } = req.body;

  let car;
  let customer;

  try {
    car = await findCarById(req.params.id);

    customer = await findCustomerByEmail(email);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: 'Server Error' });
  }

  if (car.isRented) return json({ message: 'Car is already rented' });

  // if there is no customer in db registerd, create new one.
  if (!customer) {
    cutomer = {
      name,
      email,
      phone,
      lastName,
    };

    try {
      customer = await insertCustomer(customer);
    } catch (error) {
      console.log(error.message);
      return res.status(404).json({ msg: 'Could not find or create customer' });
    }
  }

  if (!car) {
    return res.status(404).json({ msg: 'Could not this car' });
  }

  // calculate how much days car is rented
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const daysRented = daysBetween(date1, date2);

  // calculate price and discount

  let price = car.price * daysRented;

  let discount = 0;

  if (daysRented > 3) {
    discount = price * 0.05;
  } else if (daysRented > 5) {
    discount = price * 0.07;
  } else if (daysRented > 10) {
    discount = price * 0.1;
  }

  const totalPrice = price - discount;

  const rentOrder = {
    name: customer.name,
    lastName: customer.lastName,
    startDate,
    endDate,
    totalPrice,
    car: car._id,
    customer: customer._id,
    daysRented,
  };
  console.log(rentOrder);
  try {
    const result = await insertOrder(rentOrder);
    await isRented(car._id);
    await addToRentals(customer._id, car._id);
    if (result && result._id)
      return res.json({ message: 'Car rented successfuly', result });
  } catch (error) {
    console.log(error.message);
    return res.json({ msg: 'Could not rent this car, try again later ' });
  }
};

module.exports = {
  rentACarController,
};
