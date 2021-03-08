const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Order schema
const rentSchema = new Schema({
  name: { type: String, required: true, minlength: 2 },
  lastName: { type: String, required: true, minlength: 2 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  daysRented: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  discountProcent: { type: Number, required: true },
  car: { type: mongoose.Types.ObjectId, required: true, ref: 'Car' },
  customer: { type: mongoose.Types.ObjectId, required: true, ref: 'Customer' },
  createdAt: { type: Date, required: true, default: Date.now() },
});

module.exports = {
  rentSchema: mongoose.model('Rent orders', rentSchema),
};
