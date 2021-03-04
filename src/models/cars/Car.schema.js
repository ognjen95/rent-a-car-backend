const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  brand: {
    type: String,
    maxlength: 50,
    required: true,
  },
  model: { type: String, maxlength: 50, required: true },
  year: { type: Number, maxlength: 50, required: true },
  fuel: { type: String, minlength: 3, maxlength: 20, required: true },
  seats: { type: Number, maxlength: 9, required: true },
  imgUrl: {
    type: String,
    maxlength: 100,
    minlength: 8,
    required: true,
    default: './imgs/carBg.jbg',
  },
  price: { type: Number, required: true },
});
module.exports = {
  CarSchema: mongoose.model('Car', CarSchema),
};
