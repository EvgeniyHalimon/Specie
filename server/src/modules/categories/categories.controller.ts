import express, { Request, Response } from 'express';

import { categoryService } from './categories.service';

const router = express.Router();

router.get('/', async (_: Request,res: Response) => {
  try {
    const categories = await categoryService.getAll();
    res.json(categories);
  } catch (error: any) {
    res.json({ code: `${error.status}`, 'message': error.message });
  }
});

export default router;