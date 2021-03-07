const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleTypeSchema = new Schema({
  economy: [{ type: Schema.Types.ObjectId, ref: 'Car' }],
  estate: [{ type: Schema.Types.ObjectId, ref: 'Car' }],
  luxury: [{ type: Schema.Types.ObjectId, ref: 'Car' }],
  suv: [{ type: Schema.Types.ObjectId, ref: 'Car' }],
  cargo: [{ type: Schema.Types.ObjectId, ref: 'Car' }],
});

module.exports = {
  vehicleTypeSchema: mongoose.model('Vehicle Types', vehicleTypeSchema),
};
