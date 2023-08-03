import { Joi } from 'express-validation';

const registerSchema = {
  body: Joi.object({
    email: Joi.string()
      .trim()
      .email()
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .required(),
    password: Joi.string()
      .trim()
      .required()
      .min(8),
    firstname: Joi.string()
      .trim()
      .required()
      .min(2)
      .max(100),
    lastname: Joi.string()
      .trim()
      .required()
      .min(2)
      .max(100),
  }),
};

export { registerSchema };