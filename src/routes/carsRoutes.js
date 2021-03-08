const express = require('express');
const router = express.Router();

const {
  createNewCarController,
  editCarController,
  deleteCarController,
  getCarListController,
  getCarController,
} = require('../controllers/carsController');
const { newCarValidation } = require('../middleware/joiValidator');

router.all('/', (req, res, next) => {
  //   res.json({ message: 'User router' });
  next();
});

router.get('/', getCarListController);
router.get('/car/:id', getCarController);
router.post('/create-new-car', newCarValidation, createNewCarController);
router.put('/edit-car/:id', newCarValidation, editCarController);
router.delete('/delete-car/:id', deleteCarController);

module.exports = router;
