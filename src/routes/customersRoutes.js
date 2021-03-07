const express = require('express');
const {
  newCustomerController,
  getAllCustomers,
  deleteCustomer,
  updateCustomer,
  getCustomer,
} = require('../controllers/customersController');

const router = express.Router();

router.all('/', (req, res, next) => {
  //   res.json({ message: 'test customer' });
  next();
});

router.get('/', getAllCustomers);
router.get('/customer/:id', getCustomer);
router.post('/', newCustomerController);
router.delete('/delete/:id', deleteCustomer);
router.put('/edit-customer/:id', updateCustomer);

module.exports = router;
