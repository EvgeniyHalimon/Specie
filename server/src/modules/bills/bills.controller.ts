import express, { Response } from 'express';

import { validate } from 'express-validation';

import { CustomRequest } from '../../shared/types/types';

import { billService } from './bills.service';
import { createBillSchema } from './validators/createBillSchema';

const router = express.Router();

router.delete('/', async (req: CustomRequest,res: Response) => {
  try {
    await billService.deleteBill(req.id);
    res.status(204).json({ message: 'Bill deleted' });
  } catch (error: any) {
    res.json({ code: `${error.status}`, 'message': error.message });
  }
});

router.get('/', async (req: CustomRequest, res: Response) => {
  try {
    const bills = await billService.getAllUserBills(req.id);
    res.status(200).json(bills);
  } catch (error) {
    res.json({ code: `${error.status}`, 'message': error.message });
  }
});

router.post('/',  validate(createBillSchema, {}, {}), async (req: CustomRequest, res: Response) => {
  try {
    const createdBill = await billService.create(req.id, req.body);
    res.status(200).json(createdBill);
  } catch (error) {
    console.log('🚀 ~ file: bills.controller.ts:37 ~ router.post ~ error:', error);
    res.status(error.status).json({ 'message': error.message });  
  }
});

router.put('/', async (req: CustomRequest, res: Response) => {
  try {
    await billService.update(req.id, req.body);
    res.status(200).json({ 'success': 'Bill updated!' });
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });  
  }
});

export default router;