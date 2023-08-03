import { Joi } from 'express-validation';

const createBillSchema = {
  body: Joi.object({
    price: Joi.number().required(),
    comment: Joi.string().max(300),
    categoryID: Joi.number().required(),
    subcategoryID: Joi.number().required(),
  }),
};

export { createBillSchema };