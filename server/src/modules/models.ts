import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  email: { type: String, unique: true },
  firstname: String,
  lastname: String,
  password: String,
  bills: [{ type: [String], ref: 'Bill', default: [] }],
});

const categorySchema = new Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  name: { type: String, unique: true },
  subcategories: [{ type: String, ref: 'Subcategory' }],
});

const subcategorySchema = new Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  name: { type: String, unique: true },
  category: { type: String, ref: 'Category' },
});

const billSchema = new Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  price: Number,
  comment: String,
  category: { type: String, ref: 'Category' },
  subcategory: { type: String, ref: 'Subcategory' },
  user: { type: String, ref: 'User' },
});

const User = mongoose.model('User', userSchema);
const Category = mongoose.model('Category', categorySchema);
const Subcategory = mongoose.model('Subcategory', subcategorySchema);
const Bill = mongoose.model('Bill', billSchema);

export { User, Category, Subcategory, Bill };
