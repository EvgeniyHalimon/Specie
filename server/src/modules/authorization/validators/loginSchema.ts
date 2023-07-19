import { Joi } from 'express-validation';

const loginSchema = {
  body: Joi.object({
    email: Joi.string()
      .trim()
      .required(),
    password: Joi.string()
      .trim()
      .min(8)
      .required(),
  }),
};

export { loginSchema };