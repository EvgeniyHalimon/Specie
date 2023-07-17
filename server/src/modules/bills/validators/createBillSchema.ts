import { Joi } from 'express-validation';

const createBillSchema = {
  body: Joi.object({
    id: Joi.number().required(),
    price: Joi.number().required(),
    comment: Joi.string().max(300),
    categoryID: Joi.number().required(),
    subcategoryID: Joi.number().required(),
    userID: Joi.number().required(),
  }),
};

export { createBillSchema };