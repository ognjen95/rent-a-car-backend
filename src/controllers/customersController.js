const {
  insertCustomer,
  findCustomerByEmail,
  getCustomers,
  deleteCustumerById,
  findCustomerById,
} = require('../models/customers/customers.model');
const { getClientsRentedCars } = require('../models/cars/Car.model');
// @ create customer controller
// @router POST /api/customers/
// @access Public

const newCustomerController = async (req, res) => {
  const newUserData = req.body;
  try {
    const customerFromDb = await findCustomerByEmail(req.body.email);

    if (customerFromDb && customerFromDb.email === req.body.email)
      return res.json({
        status: 'error',
        msg: 'User with that email is already registerd',
      });

    const result = await insertCustomer(newUserData);

    return res.json({ message: 'New customer created', result });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', message: error.message });
  }
};

// @get all customers controller
// @router POST /api/customers/
// @access Public

const getAllCustomers = async (req, res) => {
  try {
    const result = await getCustomers();

    res.json({ result });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', message: error.message });
  }
};

// @get delete customer controller
// @router DELETE /api/customers/delete/:id
// @access Public

const deleteCustomer = async (req, res) => {
  try {
    await deleteCustumerById(req.params.id);

    res.json({ message: 'Customer deleted' });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', message: error.message });
  }
};

// @get update customer controller
// @router PUT /api/customers/edit-customer/:id
// @access Public

const updateCustomer = async (req, res) => {
  const { name, email, phone, lastName } = req.body;
  try {
    const customer = await findCustomerById(req.params.id);

    if (!customer) return res.json('Cant update customer try again later');

    if (customer) {
      customer.name = name;
      customer.email = email;
      customer.lastName = lastName;
      customer.phone = phone;
    }
    const result = await insertCustomer(customer);

    return res.json({ message: 'Customer info updated', result });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', message: error.message });
  }
};

const getCustomer = async (req, res) => {
  try {
    const result = await findCustomerById(req.params.id);

    const clientRentedCars = result.rentals.map((i) => i);

    if (!result && result._id) return res.json('No customer found');

    const rentals = await getClientsRentedCars(clientRentedCars);
    const { imgUrl, isRented, brand, model, _id } = rentals;
    if (result) return res.json({ result, rentals });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', message: error.message });
  }
};

module.exports = {
  newCustomerController,
  getAllCustomers,
  deleteCustomer,
  updateCustomer,
  getCustomer,
};
