import express, { Response, Request } from 'express';

import { userService } from './users.service';

const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await userService.findByID(Number(req.params.id));
    res.json(user);
  } catch (error: any) {
    res.status(error.status).json({ 'message': error.message });
  }
});

export default router;