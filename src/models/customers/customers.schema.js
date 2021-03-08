const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 50,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
      maxlength: 15,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
    },

    isVip: {
      type: Boolean,
      required: true,
      default: false,
    },
    rentals: [
      { type: Schema.Types.ObjectId, ref: 'Rent orders' },
      { type: Date, default: Date.now(), required: true },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = {
  customerSchema: mongoose.model('Customer', customerSchema),
};
