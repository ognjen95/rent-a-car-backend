const express = require('express');
const router = express.Router();
const { rentACarController } = require('../controllers/rentController');

router.all('/', (req, res, next) => {
  // res.json({ message: 'test customer' });
  next();
});

router.post('/:id', rentACarController);

module.exports = router;
