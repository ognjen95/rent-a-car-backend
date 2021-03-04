const express = require('express');
const router = express.Router();

const {
  createNewCarController,
  editCarController,
  deleteCarController,
  getCarListController,
} = require('../controllers/carsController');

router.all('/', (req, res, next) => {
  //   res.json({ message: 'User router' });
  next();
});

router.get('/', getCarListController);
router.post('/create-new-car', createNewCarController);
router.put('/edit-car/:id', editCarController);
router.delete('/delete-car/:id', deleteCarController);

module.exports = router;