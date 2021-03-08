const Joi = require('joi');
// customer
const email = Joi.string()
  .email({
    minDomainSegments: 2,
  })
  .required();
const name = Joi.string().min(2).max(100).required();
const fullName = Joi.string().min(2).max(100).required();

const lastName = Joi.string().min(2).max(100).required();
const phone = Joi.number().required();
const tel = Joi.number().required();
//car
const vehicleType = Joi.string().min(2).max(50).required();
const brand = Joi.string().min(2).max(60).required();
const model = Joi.string().min(2).max(50).required();
const year = Joi.number().required();
const fuel = Joi.string().min(2).max(50).required();
const seats = Joi.number().min(1).required();
const imgUrl = Joi.string().min(2).max(50).required();
const price = Joi.number().min(1).required();
const startDate = Joi.date().raw();
const endDate = Joi.date().raw();

const newCustomerValidation = (req, res, next) => {
  const schema = Joi.object({ email, name, lastName, phone });

  const value = schema.validate(req.body);
  console.log(value);

  if (value.error) {
    return res.json({ status: 'error', message: value.error.message });
  }

  next();
};

const newCarValidation = (req, res, next) => {
  const schema = Joi.object({
    vehicleType,
    brand,
    model,
    year,
    fuel,
    seats,
    imgUrl,
    price,
  });

  const value = schema.validate(req.body);
  console.log(value);

  if (value.error) {
    return res.json({ status: 'error', message: value.error.message });
  }

  next();
};

const rentACarValidation = (req, res, next) => {
  const schema = Joi.object({
    email,
    fullName,
    lastName,
    tel,
    startDate,
    endDate,
  });

  const value = schema.validate(req.body);
  console.log(value);

  if (value.error) {
    return res.json({ status: 'error', message: value.error.message });
  }

  next();
};

module.exports = {
  newCustomerValidation,
  newCarValidation,
  rentACarValidation,
};
