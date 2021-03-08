const express = require('express');
const {
  newCustomerController,
  getAllCustomers,
  deleteCustomer,
  updateCustomer,
  getCustomer,
} = require('../controllers/customersController');
const { newCustomerValidation } = require('../middleware/joiValidator');

const router = express.Router();

router.all('/', (req, res, next) => {
  //   res.json({ message: 'test customer' });
  next();
});

router.get('/', getAllCustomers);
router.get('/customer/:id', getCustomer);
router.post('/', newCustomerValidation, newCustomerController);
router.delete('/delete/:id', deleteCustomer);
router.patch('/edit-customer/:id', updateCustomer);

module.exports = router;
