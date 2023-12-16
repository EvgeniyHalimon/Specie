import dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validation';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { serverConfig } from './config';
import authController from './modules/authorization/authorization.controller';
import billController from './modules/bills/bills.controller';
import categoryController from './modules/categories/categories.controller';
import subcategoryController from './modules/subcategories/subcategories.controller';
import userController from './modules/users/users.controller';
import verifyJWT from './shared/middleware/verifyJWT';

const { DB_HOST, PORT } = serverConfig;

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use((err: ValidationError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

// routes
app.use(verifyJWT);
app.use('/auth', authController);
app.use('/users', userController);
app.use('/category', categoryController);
app.use('/subcategory', subcategoryController);
app.use('/bill', billController);

// Connect to the MongoDB



mongoose.connect(DB_HOST).then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
  });
}).catch((error: Error) => {
  console.log(error.message);
  process.exit(1);
});