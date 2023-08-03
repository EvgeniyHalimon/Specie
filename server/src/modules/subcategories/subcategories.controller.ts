import express, { Request, Response } from 'express';
/* import { validate } from 'express-validation'; */

import { subcategoryService } from './subcategories.service';

const router = express.Router();

router.get('/', async (_: Request,res: Response) => {
  try {
    const categories = await subcategoryService.getAll();
    res.json(categories);
  } catch (error: any) {
    res.json({ code: `${error.status}`, 'message': error.message });
  }
});

export default router;