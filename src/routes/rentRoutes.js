const express = require('express');
const { rentACarController } = require('../controllers/rentController');
const router = express.Router();

router.all('/', (req, res, next) => {
  // res.json({ message: 'test customer' });
  next();
});

router.post('/:id', rentACarController);

module.exports = router;
