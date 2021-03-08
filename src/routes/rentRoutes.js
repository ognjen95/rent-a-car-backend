const express = require('express');
const router = express.Router();
const { rentACarController } = require('../controllers/rentController');
const { rentACarValidation } = require('../middleware/joiValidator');

router.all('/', (req, res, next) => {
  // res.json({ message: 'test customer' });
  next();
});

router.post('/:id', rentACarValidation, rentACarController);

module.exports = router;
