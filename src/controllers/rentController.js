const { findCarById, isRented } = require('../models/cars/Car.model');
const {
  findCustomerByEmail,
  insertCustomer,
  addToRentals,
} = require('../models/customers/customers.model');

const { daysBetween } = require('../helpers/daysBetween');
const {
  insertOrder,
  findOrderOfCustomer,
} = require('../models/rent/rent.model');

//rent a car functionality

const rentACarController = async (req, res) => {
  const { fullName, lastName, email, tel, startDate, endDate } = req.body;

  if (startDate == endDate)
    return res.status(400).send('You must rent at least 1 day');
  let car;
  let customer;

  try {
    car = await findCarById(req.params.id);

    if ((car && car.isRented) || !car) {
      return res.status(404).send('Could not find this car, it is rented');
    }

    const result = await findCustomerByEmail(email);

    if (result) customer = result;
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Car is already rented');
  }

  // if there is no customer in db registerd, create new one.
  if (!customer) {
    customer = {
      name: fullName,
      email,
      phone: tel,
      lastName,
    };

    try {
      await insertCustomer(customer)
        .then((data) => (customer = data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error.message);
      return res.status(404).json({ msg: 'Could not find or create customer' });
    }
  }

  // calculate how much days car is rented
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const daysRented = daysBetween(date1, date2);

  // find out if this is VIP customer
  const allCustomerOrders = await findOrderOfCustomer(customer._id);
  const customerOrderDateList = allCustomerOrders.map(
    (order) => order.createdAt
  );
  const today = Date.now();
  let msInDay = 1000 * 3600 * 24;

  const timesRentedIn60Days = []; // if length is >3 then client is VIP

  customerOrderDateList.map((date) => {
    let daysSpanInMs = today - date.getTime();
    let days = daysSpanInMs / msInDay;
    if (days > 60) {
      timesRentedIn60Days.push(days);
    }
  });

  // calculate price and discount

  let price = car.price * daysRented;

  let discount = 0;
  let discountProcent = 0;
  if (daysRented > 3) {
    discount = price * 0.05;
    discountProcent = 5;
  }
  if (daysRented > 5) {
    discount = price * 0.07;
    discountProcent = 7;
  }
  if (daysRented > 10) {
    discount = price * 0.1;
    discountProcent = 10;
  }
  if (timesRentedIn60Days.length > 3) {
    discount = price * 0.15;
    discountProcent = 15;
  }

  const totalPrice = price - discount;

  const rentOrder = {
    name: customer.name,
    lastName: customer.lastName,
    email: customer.email,
    startDate,
    endDate,
    totalPrice,
    car: car._id,
    customer: customer._id,
    daysRented,
    discountProcent,
  };
  console.log(rentOrder);
  try {
    const result = await insertOrder(rentOrder);
    await isRented(car._id);
    await addToRentals(customer._id, car._id);

    if (!result && !result._id)
      return res.status(400).json({ message: 'Could not find Your order' });

    return res.json({ message: 'Car rented successfuly', result });
  } catch (error) {
    console.log(error.message);
    return res.json({ msg: 'Could not rent this car, try again later ' });
  }
};

module.exports = {
  rentACarController,
};
