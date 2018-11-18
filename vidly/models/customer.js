const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  isGold: Boolean,
  name: String,
  phone: Number
});

const Customer = mongoose.model("Customer-Collection", customerSchema);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    phone: Joi.string(),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
